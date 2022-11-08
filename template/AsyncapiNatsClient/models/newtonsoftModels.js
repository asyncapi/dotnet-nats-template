import { File } from '@asyncapi/generator-react-sdk';
import {
  ConstrainedDictionaryModel,
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
      {
        class: {
          self: ({ content, model  }) => {
            const corePropsWrite = Object.values(model.properties)
              .filter((prop) => !(prop.property instanceof ConstrainedDictionaryModel) || prop.property.serializationType === 'normal')
              .map((prop) => {
                return `if (value.${prop.propertyName} != null)
{
  jo.Add("${prop.unconstrainedPropertyName}", JToken.FromObject(value.${prop.propertyName}, serializer));
}`;
              });
            const unwrapPropsWrite = Object.values(model.properties)
              .filter((prop) => prop.property instanceof ConstrainedDictionaryModel && prop.property.serializationType === 'unwrap')
              .map((prop) => {
                return `if (value.${prop.propertyName} != null)
{
  foreach (var unwrapProperty in value.${prop.propertyName})
  {
    var hasProp = jo[unwrapProperty.Key]; 
    if (hasProp != null) continue;
    jo.Add(unwrapProperty.Key, JToken.FromObject(unwrapProperty.Value, serializer));
  }
}`;
              });
            const corePropsRead = Object.values(model.properties)
              .filter((prop) => !(prop.property instanceof ConstrainedDictionaryModel) || prop.property.serializationType === 'normal')
              .map((prop) => {
                return `value.${prop.propertyName} = (string)jo["${prop.unconstrainedPropertyName}"];`;
              });
            const reee = Object.values(model.properties)
              .filter((prop) => prop.property instanceof ConstrainedDictionaryModel && prop.property.serializationType === 'unwrap')
              .map((prop) => {
                return `prop.Name != "${prop.unconstrainedPropertyName}"`;
              });
            const reee2 = Object.values(model.properties)
              .filter((prop) => prop.property instanceof ConstrainedDictionaryModel && prop.property.serializationType === 'unwrap')
              .map((prop) => {
                return `prop.Name == "${prop.unconstrainedPropertyName}"`;
              });
            const dictionaryInitializers = Object.values(model.properties)
              .filter((prop) => prop.property instanceof ConstrainedDictionaryModel && prop.property.serializationType === 'unwrap')
              .map((prop) => {
                return `value.${prop.propertyName} = new Dictionary<${prop.property.key.type}, ${prop.property.value.type}>();`;
              });
            const unwrapDictionaryRead = Object.values(model.properties)
              .filter((prop) => prop.property instanceof ConstrainedDictionaryModel && prop.property.serializationType === 'unwrap')
              .map((prop) => {
                return `value.${prop.propertyName}[additionalProperty.Name] = JsonConvert.DeserializeObject(additionalProperty.Value.ToString());`;
              });
            return `${content}
public class ${model.name}Converter : JsonConverter<${model.name}>
{
  private readonly Type[] _types;

  public ${model.name}Converter(params Type[] types)
  {
      _types = types;
  }

  public override void WriteJson(JsonWriter writer, ${model.name} value, JsonSerializer serializer)
  {
    JObject jo = new JObject();

    ${corePropsWrite.join('\n')}
    ${unwrapPropsWrite.join('\n')}

    jo.WriteTo(writer);
  }

  public override ${model.name} ReadJson(JsonReader reader, Type objectType, ${model.name} existingValue, bool hasExistingValue, JsonSerializer serializer)
  {
    JObject jo = JObject.Load(reader);
    ${model.name} value = new ${model.name}();

    ${corePropsRead.join('\n')}
    
    var additionalProperties = jo.Properties().Where((prop) => ${reee.join(' || ')});
    var coreProperties = jo.Properties().Where((prop) => ${reee2.join(' || ')});
    ${dictionaryInitializers}

    foreach (var additionalProperty in additionalProperties)
    {
      ${unwrapDictionaryRead.join('\n')}
    }
    return value;
  }

  public override bool CanRead => true;
  public override bool CanWrite => true;
}`;
          },
        },
      },
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
