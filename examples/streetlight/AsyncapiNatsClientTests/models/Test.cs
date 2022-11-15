
using System.Text.Json;
using Asyncapi.Nats.Client.Models;
using Xunit;

namespace Asyncapi.Nats.Client.Tests
{
    public class Test
    {
        [Fact]
        public void ShouldSerializeAndDeserializeAccurately()
        {
             temp = new ();
            string json1 = JsonSerializer.Serialize(temp);
             output = JsonSerializer.Deserialize<>(json1);
            string json2 = JsonSerializer.Serialize(output);
            Assert.Equal(json1, json2);
        }
    }
}