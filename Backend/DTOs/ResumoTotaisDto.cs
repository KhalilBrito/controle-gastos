namespace Backend.DTOs;

public class ResumoTotaisDto
{
    public List<TotalPessoaDto> Pessoas { get; set; } = new();

    public TotalGeralDto TotalGeral { get; set; } = new();
}