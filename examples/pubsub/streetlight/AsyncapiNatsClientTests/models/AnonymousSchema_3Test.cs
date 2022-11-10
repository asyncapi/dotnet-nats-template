
using System.Text.Json;
using Asyncapi.Nats.Client.Models;
using Xunit;

namespace Asyncapi.Nats.Client.Tests
{
    public class AnonymousSchema_3Test
    {
        [Fact]
        public void ShouldSerializeAndDeserializeAccurately()
        {
            AnonymousSchema_3 temp = new AnonymousSchema_3();
            string json1 = JsonSerializer.Serialize(temp);
            AnonymousSchema_3 output = JsonSerializer.Deserialize<AnonymousSchema_3>(json1);
            string json2 = JsonSerializer.Serialize(output);
            Assert.Equal(json1, json2);
        }
    }
}