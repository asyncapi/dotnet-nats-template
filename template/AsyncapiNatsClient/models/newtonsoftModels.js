import { File } from '@asyncapi/generator-react-sdk';
import {
  CSHARP_NEWTONSOFT_SERIALIZER_PRESET,
  CSharpGenerator,
  FormatHelpers
} from '@asyncapi/modelina';

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
export default async function modelRenderer({ params, originalAsyncAPI }) {
  if (params.serializationLibrary !== 'newtonsoft') return;
  const generator = new CSharpGenerator({
    presets: [
      CSHARP_NEWTONSOFT_SERIALIZER_PRESET
    ],
  });
  const generatedModels = await generator.generateCompleteModels(JSON.parse(originalAsyncAPI), {
    namespace: 'Asyncapi.Nats.Client.Models',
  });
  const files = [];
  for (const generatedModel of generatedModels) {
    const className = FormatHelpers.toPascalCase(generatedModel.modelName);
    const modelFileName = `${className}.cs`;
    files.push(<File name={modelFileName}>{generatedModel.result}</File>);
  }
  return files;
}
