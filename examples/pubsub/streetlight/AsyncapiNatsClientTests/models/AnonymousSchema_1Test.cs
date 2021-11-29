
using System.Text.Json;
using Asyncapi.Nats.Client.Models;
using Xunit;

namespace Asyncapi.Nats.Client.Tests
{
    public class AnonymousSchema_1Test
    {
        [Fact]
        public void ShouldSerializeAndDeserializeAccurately()
        {
            AnonymousSchema_1 temp = new AnonymousSchema_1();
            string json = JsonSerializer.Serialize(temp);
            AnonymousSchema_1 output = JsonSerializer.Deserialize<AnonymousSchema_1>(json);
            Assert.Equal(temp, output);
        }
    }
}