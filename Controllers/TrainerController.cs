using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using sharpAngleTemplate.data;
using sharpAngleTemplate.tools;

namespace sharpAngleTemplate.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainerController : ControllerBase
    {
        private readonly SharpAngleContext dbContext;
        private IPokemonMapper PokeMapper;

        public TrainerController(SharpAngleContext dbContext, IPokemonMapper PokeMapper)
        {
            this.dbContext = dbContext;
            this.PokeMapper = PokeMapper;
        }

        [HttpGet("{id:int}")]
        public IActionResult Get([FromRoute] int id)
        {
            var trainerDb = dbContext.Trainers;
            var trainer = trainerDb.FirstOrDefault(t=>t.Id==id);
            if (trainer == null)
            {
                return NotFound();
            }

            return Ok(PokeMapper.MapTrainer(trainer));
        }
        [HttpGet]
        public IActionResult Get()
        {
            var trainerDb = dbContext.Trainers;

            return Ok(PokeMapper.MapMultiTrainer(trainerDb.ToList()));
        }

        [HttpPost]
        public IActionResult Add()
        {
            var trainerDb = dbContext.Trainers;
            
            return Ok();
        }

        [HttpPost("Multi")]
        public IActionResult AddMulti()
        {
            var trainerDb = dbContext.Trainers;

            return Ok();
        }

        [HttpPut]
        public IActionResult Update()
        {
            var trainerDb = dbContext.Trainers;
            
            return Ok();
        }
        [HttpPut("Multi")]
        public IActionResult UpdateMulti()
        {
            var trainerDb = dbContext.Trainers;
            
            return Ok();
        }
        [HttpDelete]
        public IActionResult Delete([FromBody] int id)
        {
            var trainerDb = dbContext.Trainers;
            
            return Ok();
        }
    }
}