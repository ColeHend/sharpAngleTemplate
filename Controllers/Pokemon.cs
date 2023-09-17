using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using sharpAngleTemplate.data;
using sharpAngleTemplate.models;
using sharpAngleTemplate.models.DTO;
using sharpAngleTemplate.models.entities;
using sharpAngleTemplate.tools;

namespace sharpAngleTemplate.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            Console.WriteLine($"{DateTime.Now}) GetPokeReq:", id);

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
            Console.WriteLine($"{DateTime.Now}) GetAllPokeReq:");

            var pokemon = dbContext.Pokemon.ToList();

            return Ok(PokeMapper.MapMultiPokemon(pokemon));
        }

        [HttpPost]
        public IActionResult Add([FromBody] PokemonAddReq pokemon)
        {
            Console.WriteLine($"{DateTime.Now}) AddPokeReq:",pokemon);
            var pokemonDb = dbContext.Pokemon;
            if (pokemon.pokeName == null)
            {
                return BadRequest();
            }
            pokemonDb.Add(new models.entities.Pokemon(){
                PokeName=pokemon.pokeName
            });

            dbContext.SaveChanges();

            return Ok(PokeMapper.MapPokemon(pokemonDb.ToList().Find(poke=>poke.PokeName==pokemon.pokeName)));

        }
        [HttpPost("Multi")]
        public IActionResult MultiAdd([FromBody] List<PokemonAddReq> pokemon)
        {
            Console.WriteLine($"{DateTime.Now}) AddMultiPokeReq:", pokemon);
            var pokemonDb = dbContext.Pokemon;
            if (pokemon.Find(poke=>poke.pokeName==null) != null)
            {
                return BadRequest();
            }
            foreach (var mon in pokemon)
            {
                pokemonDb.Add(new models.entities.Pokemon(){
                    PokeName = mon.pokeName
                });
            }

            dbContext.SaveChanges();

            return Ok(PokeMapper.MapMultiPokemon(pokemonDb.ToList()));
        }

        [HttpPut]
        public IActionResult Update([FromBody] PokemonUpdateReq pokemon)
        {
            Console.WriteLine($"{DateTime.Now}) UpdatePokeReq:", pokemon);
            
            var pokemonDb = dbContext.Pokemon;
            var pokeFromDb = pokemonDb.FirstOrDefault(p=>p.Id==pokemon.id);
            if (pokeFromDb == null)
            {
                return NotFound();
            }

            if (pokemon.pokeName != null)
            {
                pokeFromDb.PokeName = pokemon.pokeName;
            }
            dbContext.SaveChanges();

            return Ok(PokeMapper.MapPokemon(pokeFromDb));
        }

            [HttpDelete]
            public IActionResult Delete([FromBody] int id){
                var pokemonDb = dbContext.Pokemon;
                var pokemon = pokemonDb.FirstOrDefault(poke=>poke.Id==id);
                if (pokemon == null)
                {
                    return NotFound();
                }
                pokemonDb.Remove(pokemon);

                return Ok();
            }
    }

}