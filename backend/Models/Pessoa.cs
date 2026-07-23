using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class Pessoa
    {
        // Identificador único da pessoa
        public int Id { get; set; }

        // Nome obrigatório
        [Required]
        public string Nome { get; set; } = string.Empty;

        // Idade da pessoa
        [Range(0, 150)]
        public int Idade { get; set; }

        // Lista de transações dessa pessoa
        [JsonIgnore]
        public List<Transacao> Transacoes { get; set; } = new();
    }
}