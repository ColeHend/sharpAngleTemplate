using System.Globalization;
using Microsoft.EntityFrameworkCore;
using sharpAngleTemplate.CustomActionFilters;
using sharpAngleTemplate.data;
using sharpAngleTemplate.models;
using sharpAngleTemplate.models.DTO;
using sharpAngleTemplate.models.entities;
using sharpAngleTemplate.tools;

namespace sharpAngleTemplate.Repositories
{
    public class SQLPokemonRepository: ISQLPokemonRepository
    {
        private readonly SharpAngleContext dbContext;
        private readonly IPokemonMapper PokeMapper;
        public SQLPokemonRepository(SharpAngleContext dbContext, IPokemonMapper PokeMapper)
        {
            this.dbContext = dbContext;
            this.PokeMapper = PokeMapper;
        }

        public async Task<PokemonDto?> Get(int id)
        {
            var pokemonEntities = await dbContext.Pokemon.ToListAsync();
            var onePoke = pokemonEntities.Find(poke => poke.Id == id);
            if (onePoke != null)
            {
                return PokeMapper.MapPokemon(onePoke); 
            }
            
            return null;
        }
        public async Task<List<PokemonDto>> Get()
        {
            var pokemonEntities = await dbContext.Pokemon.ToListAsync();

            return PokeMapper.MapMultiPokemon(pokemonEntities);
        }

        public async Task<PokemonDto?> Add(PokemonAddReq pokemon)
        {
            if (string.IsNullOrEmpty(pokemon.pokeName) == false)
            {
                dbContext.Pokemon.Add(new Pokemon(){
                    PokeName=pokemon.pokeName
                });
            }
            await dbContext.SaveChangesAsync();
            var pokedex = await dbContext.Pokemon.ToListAsync();
            var pokeToSend = pokedex.Find(p=>p.PokeName==pokemon.pokeName);

            return pokeToSend != null ? PokeMapper.MapPokemon(pokeToSend): null;
        }

        public async Task<PokemonDto?> Update(PokemonUpdateReq pokemon)
        {
            var pokeFromDb = await dbContext.Pokemon.FirstOrDefaultAsync(p => p.Id == pokemon.id);
            if (pokeFromDb != null)
            {
                pokeFromDb.PokeName = pokemon.pokeName != null ? pokemon.pokeName: pokeFromDb.PokeName;
                dbContext.SaveChanges();
                return PokeMapper.MapPokemon(pokeFromDb);
            }

            return null;
        }
        public async Task<PokemonDto?> Remove(int id)
        {
            var pokemonDb = dbContext.Pokemon;
            var pokemon = await pokemonDb.FirstOrDefaultAsync(poke => poke.Id == id);
            
            if (pokemon == null)
            {
                return null;                
            } else {
                pokemonDb.Remove(pokemon);
                await dbContext.SaveChangesAsync();

                return PokeMapper.MapPokemon(pokemon);
            }
        }


    }

}