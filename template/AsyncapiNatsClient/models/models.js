import { File } from '@asyncapi/generator-react-sdk';
import { CSharpGenerator, FormatHelpers, CSHARP_JSON_SERIALIZER_PRESET} from '@asyncapi/modelina';

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
export default async function modelRenderer({ asyncapi }) {
  //const typescriptGenerator = new CSharpGenerator({presets: [{preset: CSHARP_COMMON_PRESET}]});
  const typescriptGenerator = new CSharpGenerator({presets: [CSHARP_JSON_SERIALIZER_PRESET]});
  const generatedModels = await typescriptGenerator.generate(asyncapi);
  const files = [];
  for (const generatedModel of generatedModels) {
    const className = FormatHelpers.toPascalCase(generatedModel.modelName);
    const modelFileName = `${className}.cs`;
    const fileContent = `
${generatedModel.dependencies.join('\n')}
namespace Asyncapi.Nats.Client.Models {
  ${generatedModel.result}
}
    `;
    files.push(<File name={modelFileName}>{fileContent}</File>);
  }
  return files;
}

