using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Partes.Server.Modelos
{
    public class EventoService
    {
        private readonly IMongoCollection<Evento> _eventoCollection;

        public EventoService(IOptions<MongoDbSettings> settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _eventoCollection = database.GetCollection<Evento>(settings.Value.CollectionName);
        }

        public async Task<List<Evento>> GetEventosAsync()
        {
            return await _eventoCollection.Find(_ => true).ToListAsync();
        }

        public async Task CrearEventoAsync(Evento nuevo)
        {
            await _eventoCollection.InsertOneAsync(nuevo);
        }
    }

}
