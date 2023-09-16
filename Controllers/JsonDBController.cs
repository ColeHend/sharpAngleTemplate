using Microsoft.AspNetCore.Mvc;
using sharpAngleTemplate.models;
using Newtonsoft.Json;

namespace sharpAngleTemplate.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JsonDBController : Controller
    {
        private DBCollection DatabaseCollection;

        public JsonDBController()
        {
            DatabaseCollection = getDB();
            
        }
        private DBCollection getDB() {
            using (StreamReader r = new StreamReader("../json/db.json"))
            {
                string json = r.ReadToEnd();
                var item = JsonConvert.DeserializeObject<DBCollection>(json);
                if (item == null)
                {
                    item = new DBCollection();
                } 
                    return item;
            }
        }
        
        [HttpPost]
        public IActionResult Get(string collectionName){
            var collection = DatabaseCollection.collections.Find((collection)=>collection.Name == collectionName);
            if (collection != null)
            {
                return new ContentResult() { Content = JsonConvert.SerializeObject(collection), StatusCode = 200 };
            } 
            return new ContentResult() { StatusCode = 204 };

        }

        [HttpPost]
        public IActionResult Post(string collectionName,string[] data){
            int index = 0;
            var collection = DatabaseCollection.collections.Find((collection)=>{
                    index = DatabaseCollection.collections.IndexOf(collection);
                    return collection.Name == collectionName;
                });
            if (collection != null && data != null)
            {
                DatabaseCollection.collections[index].Data = data;
            } 
            else if (collectionName != null && data != null)
            {
                DatabaseCollection.collections.Add(new DBCollectionModel(){Name=collectionName,Data=data});
                collection = DatabaseCollection.collections.Find((collection)=>{
                    index = DatabaseCollection.collections.IndexOf(collection);
                    return collection.Name == collectionName;
                });
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
    }
}