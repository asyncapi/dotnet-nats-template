import { getMessageType, messageHasNotNullPayload } from '../../utils/general';

/**
 * Returns the serializer code for the channel
 * @param {*} message 
 */
export function serializer(message) {
  if (!messageHasNotNullPayload(message.payload())) return '';
  const messageType = getMessageType(message);
  return `internal static byte[] JsonSerializerSupport(LoggingInterface logger, ${messageType} obj)
{
  var json = JsonSerializer.Serialize(obj);
  logger.Debug("Serialized message " + json);
  return Encoding.UTF8.GetBytes(json);
}`;
}
