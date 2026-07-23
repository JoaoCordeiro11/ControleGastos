using Backend.Data;
using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
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
        public async Task<ActionResult<TotaisGeraisDto>> Consultar()
        {
            var pessoas = await _context.Pessoas
                .Include(p => p.Transacoes)
                .ToListAsync();

            var resultado = new TotaisGeraisDto();

            foreach (var pessoa in pessoas)
            {
                var receitas = pessoa.Transacoes
                    .Where(t => t.Tipo.ToLower() == "receita")
                    .Sum(t => t.Valor);

                var despesas = pessoa.Transacoes
                    .Where(t => t.Tipo.ToLower() == "despesa")
                    .Sum(t => t.Valor);

                resultado.Pessoas.Add(new TotaisPessoaDto
                {
                    Nome = pessoa.Nome,
                    Receitas = receitas,
                    Despesas = despesas,
                    Saldo = receitas - despesas
                });
            }

            resultado.TotalReceitas = resultado.Pessoas.Sum(p => p.Receitas);

            resultado.TotalDespesas = resultado.Pessoas.Sum(p => p.Despesas);

            resultado.SaldoGeral = resultado.TotalReceitas - resultado.TotalDespesas;

            return Ok(resultado);
        }
    }
}