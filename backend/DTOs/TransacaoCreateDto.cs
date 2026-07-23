using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class TransacaoCreateDto
    {
        [Required]
        public string Descricao { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue)]
        public decimal Valor { get; set; }

        [Required]
        public string Tipo { get; set; } = string.Empty;

        public int PessoaId { get; set; }
    }
}