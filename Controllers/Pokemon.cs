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
using sharpAngleTemplate.Repositories;
using sharpAngleTemplate.tools;

namespace sharpAngleTemplate.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Pokemon : Controller
    {
        private IPokemonMapper PokeMapper;
        private ISQLPokemonRepository PokeRepo;

        public Pokemon(IPokemonMapper PokeMapper, ISQLPokemonRepository pokeRepo)
        {
            this.PokeMapper = PokeMapper;
            PokeRepo = pokeRepo;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            Console.WriteLine($"{DateTime.Now}) GetPokeReq:", id);
            var onePoke = await PokeRepo.Get(id);

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
        public async Task<IActionResult> GetAll([FromQuery] string? filterOn, [FromQuery] string? filterQuery)
        {
            var pokemon = await PokeRepo.Get();

            if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
            {
                if (filterOn.Equals("PokeName", StringComparison.OrdinalIgnoreCase))
                {
                    var pokemon2 = pokemon.Where(x=> x.PokeName.Contains(filterQuery));
                }
            }
            Console.WriteLine($"{DateTime.Now}) GetAllPokeReq:");


            return Ok(PokeMapper.MapMultiPokemon(pokemon));
        }

        [HttpPost]
        [ValidUnProtected]
        public async Task<IActionResult> Add([FromBody] PokemonAddReq poke)
        {  Console.WriteLine($"{DateTime.Now}) AddPokeReq:", poke);
            var pokemon = await PokeRepo.Add(poke);
            
            if (pokemon == null)
            {
                return BadRequest();
            }

            return Ok(PokeMapper.MapPokemon(pokemon));

        }

        [HttpPost("Multi")]
        [ValidUnProtected]
        public async Task<IActionResult> MultiAdd([FromBody] List<PokemonAddReq> pokemon)
        {
            Console.WriteLine($"{DateTime.Now}) AddMultiPokeReq:", pokemon);
            if (pokemon.Find(poke => poke.pokeName == null) != null)
            {
                return BadRequest();
            }
            foreach (var mon in pokemon)
            {
                await PokeRepo.Add(mon);
            }

            return Ok(await PokeRepo.Get());
        }

        [HttpPut]
        [ValidUnProtected]
        public async Task<IActionResult> Update([FromBody] PokemonUpdateReq pokemon)
        {
            Console.WriteLine($"{DateTime.Now}) UpdatePokeReq:", pokemon);
            var pokeFromDb = await PokeRepo.Update(pokemon);
            if (pokeFromDb != null)
            {
                return Ok(pokeFromDb);  
            } else
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [ValidUnProtected]
        public async Task<IActionResult> Delete([FromBody] int id)
        {
            var pokemon = await PokeRepo.Remove(id);

            if (pokemon == null)
            {
                return NotFound();
            }

            return Ok();
        }
    }

}