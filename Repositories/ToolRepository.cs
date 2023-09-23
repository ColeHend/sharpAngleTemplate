using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace sharpAngleTemplate.Repositories
{
    public static class ToolRepository
    {

        public static string SendAsJson(this Object dataToSend,string keyName = "data")
        {
            var token = JsonConvert.SerializeObject(dataToSend);
            var opening = "{";
            var key = $"\"{keyName}:";
            var theData = $" \"{token}\"";
            var closing = "}";
            
            return opening + key + theData + closing;
        }
    }
}