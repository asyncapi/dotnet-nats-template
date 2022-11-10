import { File } from '@asyncapi/generator-react-sdk';
import { CSharpGenerator } from '@asyncapi/modelina';

/**
 * @typedef RenderArgument
 * @type {object}
 * @property {AsyncAPIDocument} asyncapi received from the generator.
 */

/**
 * Render all schema models
 * @param {RenderArgument} param0
 * @returns
 */
export default async function modelTestRenderer({ originalAsyncAPI, params }) {
  if (params.serializationLibrary === undefined || params.serializationLibrary !== 'json') return undefined;
  const generator = new CSharpGenerator();
  const generatedModels = await generator.generate(JSON.parse(originalAsyncAPI));
  const files = [];
  for (const generatedModel of generatedModels) {
    const className = generatedModel.modelName;
    const modelFileName = `${className}Test.cs`;
    const fileContent = `
using System.Text.Json;
using Asyncapi.Nats.Client.Models;
using Xunit;

namespace Asyncapi.Nats.Client.Tests
{
    public class ${className}Test
    {
        [Fact]
        public void ShouldSerializeAndDeserializeAccurately()
        {
            ${className} temp = new ${className}();
            string json1 = JsonSerializer.Serialize(temp);
            ${className} output = JsonSerializer.Deserialize<${className}>(json1);
            string json2 = JsonSerializer.Serialize(output);
            Assert.Equal(json1, json2);
        }
    }
}`;
    files.push(<File name={modelFileName}>{fileContent}</File>);
  }
  return files;
}

