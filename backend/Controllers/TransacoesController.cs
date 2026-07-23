using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransacoesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/transacoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransacaoDto>>> Listar()
        {
            var transacoes = await _context.Transacoes
                .Include(t => t.Pessoa)
                .Select(t => new TransacaoDto
                {
                    Id = t.Id,
                    Descricao = t.Descricao,
                    Valor = t.Valor,
                    Tipo = t.Tipo,
                    PessoaId = t.PessoaId,
                    PessoaNome = t.Pessoa!.Nome
                })
                .ToListAsync();

            return Ok(transacoes);
        }

        // POST: api/transacoes
        [HttpPost]
        public async Task<ActionResult<TransacaoDto>> Criar(TransacaoCreateDto dto)
        {
            var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId);

            if (pessoa == null)
                return BadRequest("Pessoa não encontrada.");

            // Remove espaços extras no início e no fim
            dto.Tipo = dto.Tipo.Trim();

            // Valida se o tipo informado é válido (ignora maiúsculas/minúsculas)
            if (!dto.Tipo.Equals("Receita", StringComparison.OrdinalIgnoreCase) &&
                !dto.Tipo.Equals("Despesa", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest("Tipo deve ser 'Receita' ou 'Despesa'.");
            }

            // Padroniza o valor antes de salvar no banco
            dto.Tipo = char.ToUpper(dto.Tipo[0]) + dto.Tipo[1..].ToLower();

            // Valida se o valor é maior que zero
            if (dto.Valor <= 0)
            {
                return BadRequest("O valor deve ser maior que zero.");
            }

            // Regra de negócio:
            // menores de idade não podem cadastrar receitas.
            if (pessoa.Idade < 18 &&
                dto.Tipo == "Receita")
            {
                return BadRequest("Menores de idade só podem cadastrar despesas.");
            }

            var transacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                PessoaId = dto.PessoaId
            };

            _context.Transacoes.Add(transacao);

            await _context.SaveChangesAsync();

            var resposta = new TransacaoDto
            {
                Id = transacao.Id,
                Descricao = transacao.Descricao,
                Valor = transacao.Valor,
                Tipo = transacao.Tipo,
                PessoaId = transacao.PessoaId
            };

            return CreatedAtAction(nameof(Listar), new { id = resposta.Id }, resposta);
        }
    }
}