import { getMessageType, messageHasNotNullPayload } from '../../utils/general';

/**
 * Returns the deserializer functionality for the channel
 * 
 * @param {*} message 
 * @param {*} params 
 */
export function deserializer(message, params) {
  if (!messageHasNotNullPayload(message.payload())) return '';
  const messageType = getMessageType(message);
  const deserialization = params.serializationLibrary === 'json' ? `JsonSerializer.Deserialize<${messageType}>(srt);` : `JsonConvert.DeserializeObject<${messageType}>(srt, new ${messageType}Converter());`;  
  return `internal static ${messageType} JsonDeserializerSupport(LoggingInterface logger, byte[] buffer)
{
  var srt = Encoding.UTF8.GetString(buffer);
  logger.Debug("Deserializing message " + srt);
  return ${deserialization}
}`;
}
