
using Asyncapi.Nats.Client.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using Xunit;

namespace Asyncapi.Nats.Client.Tests
{
    public class AnonymousSchema_3Test
    {
        [Fact]
        public void ShouldSerializeAndDeserializeAccurately()
        {
            AnonymousSchema_3 temp = new AnonymousSchema_3();            
            string json1 = JsonConvert.SerializeObject(temp, Formatting.Indented, new AnonymousSchema_3Converter());
            AnonymousSchema_3 output = JsonConvert.DeserializeObject<AnonymousSchema_3>(json1, new AnonymousSchema_3Converter());
            string json2 = JsonConvert.SerializeObject(output, Formatting.Indented, new AnonymousSchema_3Converter());
            Assert.Equal(json1, json2);
        }
    }
}