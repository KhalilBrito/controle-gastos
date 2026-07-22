using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TotaisController : ControllerBase
{
    private readonly AppDbContext _context;

    public TotaisController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<ResumoTotaisDto>> GetTotais()
    {
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .ToListAsync();

        var pessoasResumo = pessoas.Select(p =>
        {
            var receitas = p.Transacoes
                .Where(t => t.Tipo.Equals("Receita", StringComparison.OrdinalIgnoreCase))
                .Sum(t => t.Valor);

            var despesas = p.Transacoes
                .Where(t => t.Tipo.Equals("Despesa", StringComparison.OrdinalIgnoreCase))
                .Sum(t => t.Valor);

            return new TotalPessoaDto
            {
                PessoaId = p.Id,
                Nome = p.Nome,
                TotalReceitas = receitas,
                TotalDespesas = despesas,
                Saldo = receitas - despesas
            };
        }).ToList();

        var totalGeral = new TotalGeralDto
        {
            TotalReceitas = pessoasResumo.Sum(x => x.TotalReceitas),
            TotalDespesas = pessoasResumo.Sum(x => x.TotalDespesas),
            Saldo = pessoasResumo.Sum(x => x.Saldo)
        };

        var resumo = new ResumoTotaisDto
        {
            Pessoas = pessoasResumo,
            TotalGeral = totalGeral
        };

        return Ok(resumo);
    }
}
