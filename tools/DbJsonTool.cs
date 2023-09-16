using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using sharpAngleTemplate.models;

namespace sharpAngleTemplate.tools
{
    public class DbJsonService : IDbJsonService
    {
        private DBCollection DatabaseCollection;

        public DbJsonService()
        {
            DatabaseCollection = getDB();
        }
        // ------- DatabaseCollection && DB JSON Interactions ---------
        public DBCollection getDB() {
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
        public void SyncDatabaseJSON(){
            string jsonSTR = JsonConvert.ToString(DatabaseCollection);
            using (StreamWriter r = new StreamWriter("../json/db.json",false))
            {
                r.Write(jsonSTR);
            }
        }

        // --------- DatabaseCollection Interactions ----------
        public int GetCollectionIndex(string collectionName){
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
        public DBCollectionModel? GetCollectionFromDB(string collectionName) {
            int index = 0;
            var collection = DatabaseCollection.collections.Find((collection)=>{
                    index = DatabaseCollection.collections.IndexOf(collection);
                    return collection.Name == collectionName;
                });
            return collection;
        } 
        public void ReplaceCollectionAllData(string collectionName, string[] data){
            var index = GetCollectionIndex(collectionName);
            if (index > -1)
            {
                DatabaseCollection.collections[index].Data = data;
            }
        }
        public void AddToDataCollection(string collectionName, string data) {
            var collectionIndex = GetCollectionIndex(collectionName);
            if (data != null && collectionIndex > -1)
            {
                DatabaseCollection?.collections[collectionIndex]?.Data?.Append(data ?? "");
            }
        }
        public void CreateCollectionInDB(string collectionName, string[] data) {
            var alreadyExists = DatabaseCollection.collections.Find((value)=>value.Name==collectionName);
            if (alreadyExists == null)
            {
                DatabaseCollection.collections.Add(new DBCollectionModel(){Name=collectionName,Data=data});
                SyncDatabaseJSON();
            }
        }
    }
    public interface IDbJsonService {
        DBCollection getDB();
        void SyncDatabaseJSON();
        int GetCollectionIndex(string collectionName);
        DBCollectionModel? GetCollectionFromDB(string collectionName);
        void ReplaceCollectionAllData(string collectionName, string[] data);
        void AddToDataCollection(string collectionName, string data);
        void CreateCollectionInDB(string collectionName, string[] data);
    }
}