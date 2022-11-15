
using Asyncapi.Nats.Client.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using Xunit;

namespace Asyncapi.Nats.Client.Tests
{
    public class AnonymousSchema_1Test
    {
        [Fact]
        public void ShouldSerializeAndDeserializeAccurately()
        {
            AnonymousSchema_1 temp = new AnonymousSchema_1();            
            string json1 = JsonConvert.SerializeObject(temp, Formatting.Indented, new AnonymousSchema_1Converter());
            AnonymousSchema_1 output = JsonConvert.DeserializeObject<AnonymousSchema_1>(json1, new AnonymousSchema_1Converter());
            string json2 = JsonConvert.SerializeObject(output, Formatting.Indented, new AnonymousSchema_1Converter());
            Assert.Equal(json1, json2);
        }
    }
}