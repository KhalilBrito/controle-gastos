using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacaoController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransacaoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transacao>>> GetTransacoes()
    {
        return await _context.Transacoes.ToListAsync();
    }

    [HttpPost]
    
    public async Task<ActionResult<Transacao>> PostTransacao(Transacao transacao)
    {
        var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);

        if (pessoa is null)
        {
            return NotFound();
        }

        if (transacao.Tipo.Equals("Receita", StringComparison.OrdinalIgnoreCase)
            && pessoa.Idade < 18)
        {
            return BadRequest("Menor de idade não pode receber receita.");
        }

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTransacoes), new { id = transacao.Id }, transacao);
    }
}
