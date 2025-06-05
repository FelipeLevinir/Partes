using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Partes.Server.Modelos;

namespace Partes.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly EventoService _eventoService;

        public EventoController(EventoService eventoService)
        {
            _eventoService = eventoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var eventos = await _eventoService.GetEventosAsync();
            return Ok(eventos);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Evento evento)
        {
            await _eventoService.CrearEventoAsync(evento);
            return Ok();
        }
    }

}
