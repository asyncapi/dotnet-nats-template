import { getMessageType, messageHasNotNullPayload } from '../../utils/general';

export function deserializer(message) {
  if (!messageHasNotNullPayload(message.payload())) return '';
  const messageType = getMessageType(message);
  return `internal static ${messageType}NameSpace.${messageType} JsonDeserializer(LoggingInterface logger, byte[] buffer)
{
  var srt = Encoding.UTF8.GetString(buffer);
  logger.Debug("Deserializing message " + srt);
  return ${messageType}NameSpace.${messageType}.FromJson(srt);
}`;
}
