import { File } from '@asyncapi/generator-react-sdk';
import { CSharpGenerator } from '@asyncapi/modelina';

/**
 * @typedef RenderArgument
 * @type {object}
 * @property {any} originalAsyncAPI received from the generator.
 */

/**
 * Render all schema models
 * @param {RenderArgument} param0
 * @returns
 */

export default async function modelTestRenderer({ originalAsyncAPI, params }) {
  if (params.serializationLibrary !== 'newtonsoft') return;
  const generator = new CSharpGenerator();
  const generatedModels = await generator.generate(
    JSON.parse(originalAsyncAPI)
  );
  const files = [];

  for (const generatedModel of generatedModels) {
    const className = generatedModel.modelName;
    const modelFileName = `${className}Test.cs`;
    const fileContent = `
using Asyncapi.Nats.Client.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using Xunit;

namespace Asyncapi.Nats.Client.Tests
{
    public class ${className}Test
    {
        [Fact]
        public void ShouldSerializeAndDeserializeAccurately()
        {
            ${className} temp = new ${className}();            
            string json1 = JsonConvert.SerializeObject(temp, Formatting.Indented, new ${className}Converter());
            ${className} output = JsonConvert.DeserializeObject<${className}>(json1, new ${className}Converter());
            string json2 = JsonConvert.SerializeObject(output, Formatting.Indented, new ${className}Converter());
            Assert.Equal(json1, json2);
        }
    }
}`;
    files.push(<File name={modelFileName}>{fileContent}</File>);
  }
  return files;
}
