using Microsoft.AspNetCore.Mvc;
using sharpAngleTemplate.models;
using Newtonsoft.Json;
using Microsoft.OpenApi.Any;

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
        // ------- DatabaseCollection && DB JSON Interactions ---------
        private DBCollection getDB() {
            using (StreamReader r = new StreamReader("../json/db.json"))
            {
                string json = r.ReadToEnd();
                var item = JsonConvert.DeserializeObject<DBCollection>(json);
                if (item == null)
                {
                    return new DBCollection();
                } else
                {
                    return item;
                }
            }
        }
        private void SyncDatabaseJSON(){
            string jsonSTR = JsonConvert.ToString(DatabaseCollection);
            using (StreamWriter r = new StreamWriter("../json/db.json",false))
            {
                r.Write(jsonSTR);
            }
        }

        // --------- DatabaseCollection Interactions ----------
        private int GetCollectionIndex(string collectionName){
            int index = -1;
            var collection = DatabaseCollection.collections.Find((collection)=>{
                    if (collection.Name == collectionName)
                    {
                        index = DatabaseCollection.collections.IndexOf(collection);
                    }
                    return collection.Name == collectionName;
                });
            return index;
        }
        private DBCollectionModel? GetCollectionFromDB(string collectionName) {
            int index = 0;
            var collection = DatabaseCollection.collections.Find((collection)=>{
                    index = DatabaseCollection.collections.IndexOf(collection);
                    return collection.Name == collectionName;
                });
            return collection;
        } 
        private void AddToDataCollection(string collectionName, string data) {
            var collection = GetCollection(collectionName);
            var collectionIndex = GetCollectionIndex(collectionName);
            if (data != null && collection != null)
            {
                DatabaseCollection?.collections[collectionIndex]?.Data?.Append(data ?? "");
            }
        }
        private void CreateCollectionInDB(string collectionName, string[] data) {
            DatabaseCollection.collections.Add(new DBCollectionModel(){Name=collectionName,Data=data});
            SyncDatabaseJSON();
        }

        // ---------------- Endpoints ------------------
        [HttpPost]
        public IActionResult GetCollection(string collectionName){
            var collection = GetCollectionFromDB(collectionName);
            if (collection != null)
            {
                return new ContentResult() { Content = JsonConvert.SerializeObject(collection), StatusCode = 200 };
            } 
            return new ContentResult() { StatusCode = 204 };

        }

        [HttpPost]
        public IActionResult CreateCollection(string collectionName, string[] data)
        {
            int index = GetCollectionIndex(collectionName);
            var collection = GetCollectionFromDB(collectionName);

            if (collection != null && data != null)
            {
                DatabaseCollection.collections[index].Data = data;
            } 
            else if (collectionName != null && data != null)
            {
                CreateCollectionInDB(collectionName, data);
                collection = GetCollectionFromDB(collectionName);
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

        [HttpPost]
        public IActionResult AddData(string collectionName, string data)
        {
            var index = GetCollectionIndex(collectionName);
            if (index >= 0 && data != null)
            {
                AddToDataCollection(collectionName, data);
            }
            SyncDatabaseJSON();
            return new ContentResult(){StatusCode=200};
        }

        [HttpPost]
        public IActionResult AddMassData(string collectionName, string[] data)
        {
            var index = GetCollectionIndex(collectionName);
            if (index >= 0 && data != null)
            {
                foreach (var item in data)
                {
                    AddToDataCollection(collectionName, item);
                }
            }
            SyncDatabaseJSON();
            return new ContentResult(){StatusCode=200};
        }
    }
}