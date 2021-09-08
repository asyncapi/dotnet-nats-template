import { File } from '@asyncapi/generator-react-sdk';
import { CSharpGenerator, FormatHelpers } from '@asyncapi/modelina';

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
export default async function modelTestRenderer({ asyncapi }) {
  const typescriptGenerator = new CSharpGenerator();
  const generatedModels = await typescriptGenerator.generate(asyncapi);
  const files = [];
  for (const generatedModel of generatedModels) {
    const className = FormatHelpers.toPascalCase(generatedModel.modelName);
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
            string json = JsonSerializer.Serialize(temp);
            ${className} output = JsonSerializer.Deserialize<${className}>(json);
            Assert.Equal(temp, output);
        }
    }
}`;
    files.push(<File name={modelFileName}>{fileContent}</File>);
  }
  return files;
}

