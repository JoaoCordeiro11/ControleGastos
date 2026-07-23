namespace Backend.DTOs
{
    public class TotaisPessoaDto
    {
        public string Nome { get; set; } = string.Empty;

        public decimal Receitas { get; set; }

        public decimal Despesas { get; set; }

        public decimal Saldo { get; set; }
    }

    public class TotaisGeraisDto
    {
        public List<TotaisPessoaDto> Pessoas { get; set; } = new();

        public decimal TotalReceitas { get; set; }

        public decimal TotalDespesas { get; set; }

        public decimal SaldoGeral { get; set; }
    }
}