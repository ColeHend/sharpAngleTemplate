using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using sharpAngleTemplate.data;
using sharpAngleTemplate.tools;

namespace sharpAngleTemplate.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Pokemon : Controller
    {
        private readonly SharpAngleContext dbContext;
        private IPokemonMapper PokeMapper;

        public Pokemon(SharpAngleContext dbContext,IPokemonMapper PokeMapper)
        {
            this.dbContext = dbContext;
            this.PokeMapper = PokeMapper;
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var pokemon = dbContext.Pokemon.ToList();
            var onePoke = pokemon.Find(poke=>poke.Id==id);

            if (onePoke != null)
            {
                return Ok(PokeMapper.MapPokemon(onePoke));
            } else
            {
                return NotFound();
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var pokemon = dbContext.Pokemon.ToList();

            return Ok(PokeMapper.MapMultiPokemon(pokemon));
        }

        [HttpPost]
        public void Add()
        {
            var pokemon = dbContext.Pokemon;

        }
        [HttpPost("Multi")]
        public void MultiAdd()
        {
            var pokemon = dbContext.Pokemon;

        }

        [HttpPut]
        public void Update()
        {
            var pokemon = dbContext.Pokemon;

        }
        [HttpPut("Multi")]
        public void MultiUpdate()
        {
            var pokemon = dbContext.Pokemon;

        }
    }
}