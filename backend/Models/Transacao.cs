using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class Transacao
    {
        // Identificador da transação
        public int Id { get; set; }

        // Descrição da transação
        [Required]
        public string Descricao { get; set; } = string.Empty;

        // Valor em reais
        public decimal Valor { get; set; }

        // Receita ou Despesa
        [Required]
        public string Tipo { get; set; } = string.Empty;

        // Chave estrangeira
        public int PessoaId { get; set; }

        // Pessoa dona da transação
        [JsonIgnore]
        public Pessoa? Pessoa { get; set; }
    }
}