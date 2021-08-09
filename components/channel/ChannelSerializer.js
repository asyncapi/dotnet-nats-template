import { getMessageType, messageHasNotNullPayload } from '../../utils/general';

export function serializer(message) {
  if (!messageHasNotNullPayload(message.payload())) return '';
  const messageType = getMessageType(message);
  return `internal static byte[] JsonSerializer(LoggingInterface logger, ${messageType}NameSpace.${messageType} obj)
{
  var json = ${messageType}NameSpace.Serialize.ToJson(obj);
  logger.Debug("Serialized message " + json);
  return Encoding.UTF8.GetBytes(json);
}`;
}
