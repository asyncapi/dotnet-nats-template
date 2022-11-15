import { getMessageType, messageHasNotNullPayload } from '../../utils/general';

/**
 * Returns the serializer code for the channel
 * @param {*} message 
 * @param {*} params 
 */
export function serializer(message, params) {
  if (!messageHasNotNullPayload(message.payload())) return '';
  const messageType = getMessageType(message);
  const serialization = params.serializationLibrary === 'json' ? 'JsonSerializer.Serialize(obj);' : 'JsonConvert.SerializeObject(obj);';  
  return `internal static byte[] JsonSerializerSupport(LoggingInterface logger, ${messageType} obj)
{
  var json = ${serialization}
  logger.Debug("Serialized message " + json);
  return Encoding.UTF8.GetBytes(json);
}`;
}
