import { File } from '@asyncapi/generator-react-sdk';
import { CSharpGenerator, FormatHelpers, CSHARP_JSON_SERIALIZER_PRESET} from '@asyncapi/modelina';

/**
 * @typedef RenderArgument
 * @type {object}
 * @property {AsyncAPIDocument} originalAsyncAPI received from the generator.
 */

/**
 * Render all schema models
 * @param {RenderArgument} param0
 * @returns
 */
export default async function modelRenderer({ originalAsyncAPI, params }) {
  if (params.serializationLibrary === undefined || params.serializationLibrary !== 'json') return undefined;
  const generator = new CSharpGenerator({presets: [CSHARP_JSON_SERIALIZER_PRESET]});
  
  const generatedModels = await generator.generateCompleteModels(JSON.parse(originalAsyncAPI), {
    namespace: 'Asyncapi.Nats.Client.Models'
  });
  const files = [];
  for (const generatedModel of generatedModels) {
    const className = FormatHelpers.toPascalCase(generatedModel.modelName);
    const modelFileName = `${className}.cs`;
    files.push(<File name={modelFileName}>{generatedModel.result}</File>);
  }
  return files;
}
