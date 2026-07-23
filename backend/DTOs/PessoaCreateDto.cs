using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class PessoaCreateDto
    {
        [Required]
        public string Nome { get; set; } = string.Empty;

        [Range(0, 150)]
        public int Idade { get; set; }
    }
}