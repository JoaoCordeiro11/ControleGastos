using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.DTOs;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PessoasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/pessoas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PessoaDto>>> Listar()
        {
            var pessoas = await _context.Pessoas
                .Select(p => new PessoaDto
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Idade = p.Idade
                })
                .ToListAsync();

            return Ok(pessoas);
        }

        // POST: api/pessoas
        [HttpPost]
        public async Task<ActionResult<PessoaDto>> Criar(PessoaCreateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Nome))
            {
                return BadRequest("Nome é obrigatório.");
            }

            if (dto.Idade <= 0)
            {
                return BadRequest("Insira a idade, deve ser maior que zero.");
            }

            var pessoa = new Pessoa
            {
                Nome = dto.Nome,
                Idade = dto.Idade
            };

            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();

            var resposta = new PessoaDto
            {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                Idade = pessoa.Idade
            };

            return CreatedAtAction(nameof(Listar), new { id = pessoa.Id }, resposta);
        }

        // DELETE: api/pessoas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);

            if (pessoa == null)
                return NotFound();

            _context.Pessoas.Remove(pessoa);

            await _context.SaveChangesAsync();

            return Ok("Pessoa excluída com sucesso.");
        }
    }
}