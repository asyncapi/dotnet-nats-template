import { getMessageType, messageHasNotNullPayload, realizeChannelName, realizeParametersForChannel } from '../../utils/general';
import {serializer} from './ChannelSerializer';
export default function publish(channelName, channelParameters, publishMessage) {
  const functionParameters = ['LoggingInterface logger', 'IEncodedConnection connection'];
  if (messageHasNotNullPayload(publishMessage.payload())) {
    const messageType = getMessageType(publishMessage);
    functionParameters.push(`${messageType}NameSpace.${messageType} requestMessage `);
  }
  if (channelParameters.length > 0) {
    functionParameters.push(realizeParametersForChannel(channelParameters));
  }
  const realizedChannelPath = realizeChannelName(channelParameters, channelName);
  let publishCode = `connection.Publish(${realizedChannelPath}, Encoding.UTF8.GetBytes("null"));}`;
  if (messageHasNotNullPayload(publishMessage.payload())) {
    publishCode = `var serializedObject = JsonSerializer(logger, requestMessage); 
  connection.Publish(${realizedChannelPath}, serializedObject);`;
  }
  return `
${serializer(publishMessage)}

public static void Publish(
  ${functionParameters.join(',\n')}
){
  logger.Debug("Publishing to channel " + ${realizedChannelPath});
  ${publishCode}
}`;
}
