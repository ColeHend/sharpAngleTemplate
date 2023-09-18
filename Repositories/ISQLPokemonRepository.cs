using sharpAngleTemplate.models;
using sharpAngleTemplate.models.DTO;

namespace sharpAngleTemplate.Repositories
{
    public interface ISQLPokemonRepository
    {
        Task<PokemonDto?> Get(int id);
        Task<List<PokemonDto>> Get();
        Task<PokemonDto?> Add(PokemonAddReq pokemon);
        Task<PokemonDto?> Update(PokemonUpdateReq pokemon);
        Task<PokemonDto?> Remove(int id);
    }
}