using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sharpAngleTemplate.CustomActionFilters;
using sharpAngleTemplate.data;
using sharpAngleTemplate.models;
using sharpAngleTemplate.Repositories;
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
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            var trainerDb = dbContext.Trainers;
            var trainer = await trainerDb.FirstOrDefaultAsync(t=>t.Id==id);
            if (trainer == null)
            {
                return NotFound();
            }

            return Ok(PokeMapper.MapTrainer(trainer).SendAsJson());
        }
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var trainerDb = dbContext.Trainers;
            var trainerDex = await trainerDb.ToListAsync();
            return Ok(PokeMapper.MapMultiTrainer(trainerDex).SendAsJson());
        }

        [HttpPost]
        [Valid]
        public IActionResult Add([FromBody] TrainerAddReq trainer)
        {
            var trainerDb = dbContext.Trainers;
            var train = new models.entities.Trainer(){
                Name=trainer.Name,
                UserId=trainer.UserId,
                Pokemon=trainer.Pokemon
            };
            trainerDb.Add(train);
            dbContext.SaveChanges();
            
            return Ok(PokeMapper.MapTrainer(trainerDb.Find(train)).SendAsJson());
        }

        [HttpPost("Multi")]
        [Valid]
        public IActionResult AddMulti([FromBody] List<TrainerAddReq> trainers)
        {
            var trainerDb = dbContext.Trainers;
            foreach (var trainer in trainers)
            {
                var train = new models.entities.Trainer(){
                Name=trainer.Name,
                UserId=trainer.UserId,
                Pokemon=trainer.Pokemon
            };
                trainerDb.Add(train);
            }
            var theTrainers = trainerDb.ToList().FindAll(t=>t.UserId==trainers[0].UserId);

            return Ok(PokeMapper.MapMultiTrainer(theTrainers).SendAsJson());
        }

        [HttpPut]
        [Valid]
        public IActionResult Update([FromBody] TrainerUpdateReq trainer)
        {
            var trainerDb = dbContext.Trainers;
            
            var trainerDomain = trainerDb.FirstOrDefault(t=>t.Id==trainer.Id);
            if (trainerDomain == null)
            {
                return NotFound();
            }
            if (trainer.Name != null)
            {
                trainerDomain.Name = trainer.Name;
            }
            if (trainer.Pokemon != null)
            {
                trainerDomain.Pokemon = trainer.Pokemon;
            }
            dbContext.SaveChanges();

            return Ok(PokeMapper.MapTrainer(trainerDomain).SendAsJson());
        }

        [HttpDelete]
        [Valid]
        public IActionResult Delete([FromBody] int id)
        {
            var trainerDb = dbContext.Trainers;
            var trainerDomain = trainerDb.FirstOrDefault(t=>t.Id==id);
            if (trainerDomain == null)
            {
                return NotFound();
            }
            trainerDb.Remove(trainerDomain);
            
            return Ok();
        }
    }
}