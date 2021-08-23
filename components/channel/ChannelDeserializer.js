import { getMessageType, messageHasNotNullPayload } from '../../utils/general';

/**
 * Returns the deserializer functionality for the channel
 * 
 * @param {*} message 
 */
export function deserializer(message) {
  if (!messageHasNotNullPayload(message.payload())) return '';
  const messageType = getMessageType(message);
  return `internal static ${messageType} JsonDeserializerSupport(LoggingInterface logger, byte[] buffer)
{
  var srt = Encoding.UTF8.GetString(buffer);
  logger.Debug("Deserializing message " + srt);
  return JsonSerializer.Deserialize<${messageType}>(srt);
}`;
}
