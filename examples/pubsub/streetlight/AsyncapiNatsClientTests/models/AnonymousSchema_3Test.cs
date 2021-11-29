
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
            string json = JsonSerializer.Serialize(temp);
            AnonymousSchema_3 output = JsonSerializer.Deserialize<AnonymousSchema_3>(json);
            Assert.Equal(temp, output);
        }
    }
}