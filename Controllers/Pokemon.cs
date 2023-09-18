using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sharpAngleTemplate.CustomActionFilters;
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

        public Pokemon(SharpAngleContext dbContext, IPokemonMapper PokeMapper)
        {
            this.dbContext = dbContext;
            this.PokeMapper = PokeMapper;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            Console.WriteLine($"{DateTime.Now}) GetPokeReq:", id);

            var pokemon = await dbContext.Pokemon.ToListAsync();
            var onePoke = pokemon.Find(poke => poke.Id == id);

            if (onePoke != null)
            {
                return Ok(PokeMapper.MapPokemon(onePoke));
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            Console.WriteLine($"{DateTime.Now}) GetAllPokeReq:");

            var pokemon = await dbContext.Pokemon.ToListAsync();

            return Ok(PokeMapper.MapMultiPokemon(pokemon));
        }

        [HttpPost]
        [ValidUnProtected]
        public async Task<IActionResult> Add([FromBody] PokemonAddReq pokemon)
        {
            Console.WriteLine($"{DateTime.Now}) AddPokeReq:", pokemon);
            var pokemonDb = dbContext.Pokemon;
            if (pokemon.pokeName == null)
            {
                return BadRequest();
            }
            pokemonDb.Add(new models.entities.Pokemon()
            {
                PokeName = pokemon.pokeName
            });

            await dbContext.SaveChangesAsync();
            var pokedex = await pokemonDb.ToListAsync();

            return Ok(PokeMapper.MapPokemon(pokedex.Find(poke => poke.PokeName == pokemon.pokeName)));

        }

        [HttpPost("Multi")]
        [ValidUnProtected]
        public async Task<IActionResult> MultiAdd([FromBody] List<PokemonAddReq> pokemon)
        {
            Console.WriteLine($"{DateTime.Now}) AddMultiPokeReq:", pokemon);
            var pokemonDb = dbContext.Pokemon;
            if (pokemon.Find(poke => poke.pokeName == null) != null)
            {
                return BadRequest();
            }
            foreach (var mon in pokemon)
            {
                pokemonDb.Add(new models.entities.Pokemon()
                {
                    PokeName = mon.pokeName
                });
            }

            await dbContext.SaveChangesAsync();
            var pokedex = await pokemonDb.ToListAsync();

            return Ok(PokeMapper.MapMultiPokemon(pokedex));
        }

        [HttpPut]
        [ValidUnProtected]
        public async Task<IActionResult> Update([FromBody] PokemonUpdateReq pokemon)
        {
            Console.WriteLine($"{DateTime.Now}) UpdatePokeReq:", pokemon);

            var pokemonDb = dbContext.Pokemon;
            var pokeFromDb = await pokemonDb.FirstOrDefaultAsync(p => p.Id == pokemon.id);
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
        [ValidUnProtected]
        public async Task<IActionResult> Delete([FromBody] int id)
        {
            var pokemonDb = dbContext.Pokemon;
            var pokemon = await pokemonDb.FirstOrDefaultAsync(poke => poke.Id == id);

            if (pokemon == null)
            {
                return NotFound();
            }
            pokemonDb.Remove(pokemon);

            return Ok();
        }
    }

}