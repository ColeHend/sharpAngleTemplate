using Microsoft.AspNetCore.Mvc;
using sharpAngleTemplate.models;
using Newtonsoft.Json;
using Microsoft.OpenApi.Any;
using sharpAngleTemplate.tools;

namespace sharpAngleTemplate.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JsonDbController : Controller
    {
        private IDbJsonService _db;
        public JsonDbController(IDbJsonService DbJsonService)
        {
            _db = DbJsonService;
        }
        // ---------------- Endpoints ------------------
        [HttpPost("GetCollection")]
        public IActionResult GetCollection([FromBody] AddMassDataReq request){
            Console.WriteLine("GetCollection: ",request);
            var collectionName = request.collectionName;
            var collection = _db.GetCollectionFromDB(collectionName);
            if (collection != null)
            {
                return new ContentResult() { Content = JsonConvert.SerializeObject(collection), StatusCode = 200 };
            } 
            return new ContentResult() { StatusCode = 204 };

        }

        [HttpPost("CreateCollection")]
        public IActionResult CreateCollection([FromBody] CreateCollectionReq request)
        {
            Console.WriteLine("CreateCollection",request);

            var collectionName = request.collectionName;
            var data = request.data;

            int index = _db.GetCollectionIndex(collectionName);
            var collection = _db.GetCollectionFromDB(collectionName);

            if (collection != null && data != null && index > -1)
            {
                _db.ReplaceCollectionAllData(collectionName, data);
            } 
            else if (collectionName != null && data != null && index == -1)
            {
                _db.CreateCollectionInDB(collectionName, data);
                collection = _db.GetCollectionFromDB(collectionName);
            }

            if (collection != null)
            {
                return new ContentResult() {Content = JsonConvert.SerializeObject(collection), StatusCode = 200 };
            }
            else
            {
                return new ContentResult() {StatusCode = 500};
            }
        }

        [HttpPost("AddData")]
        public IActionResult AddData([FromBody] AddDataReq request)
        {
            Console.WriteLine("AddData",request);
            var collectionName = request.collectionName;
            var data = request.data;

            var index = _db.GetCollectionIndex(collectionName);
            if (index >= 0 && data != null)
            {
                _db.AddToDataCollection(collectionName, data);
            }
            _db.SyncDatabaseJSON();
            return new ContentResult(){StatusCode=200};
        }

        [HttpPost("AddMassData")]
        public IActionResult AddMassData([FromBody] AddMassDataReq request)
        {
            Console.WriteLine("AddMassData",request);
            var collectionName = request.collectionName;
            var data = request.data;

            var index = _db.GetCollectionIndex(collectionName);
            if (index >= 0 && data != null)
            {
                foreach (var item in data)
                {
                    _db.AddToDataCollection(collectionName, item);
                }
            }
            _db.SyncDatabaseJSON();
            return new ContentResult(){StatusCode=200};
        }
    }

    public class GetCollectionReq 
    {
        public string collectionName {get;set;}
    }
    public class CreateCollectionReq
    {
        public string collectionName {get;set;}
        public string[] data {get;set;}
    }
    public class AddDataReq
    {
        public string collectionName {get;set;}
        public string data {get;set;}
    }
    public class AddMassDataReq
    {
        public string collectionName {get;set;}
        public string[] data {get;set;}
    }
}