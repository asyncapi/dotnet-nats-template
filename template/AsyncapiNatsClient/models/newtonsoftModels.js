import { File } from '@asyncapi/generator-react-sdk';
import {
  CSHARP_NEWTONSOFT_SERIALIZER_PRESET,
  CSharpGenerator
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
export default async function modelRenderer({ params, asyncapi }) {
  if (params.serializationLibrary !== 'newtonsoft') return;
  const generator = new CSharpGenerator({
    presets: [
      CSHARP_NEWTONSOFT_SERIALIZER_PRESET
    ],
  });
  const generatedModels = await generator.generateCompleteModels(asyncapi, {
    namespace: 'Asyncapi.Nats.Client.Models',
  });
  const files = [];
  for (const generatedModel of generatedModels) {
    const modelFileName = `${generatedModel.modelName}.cs`;
    files.push(<File name={modelFileName}>{generatedModel.result}</File>);
  }
  return files;
}
