import { getMessageType, messageHasNotNullPayload, realizeChannelName, realizeParametersForChannel } from '../../utils/general';
import {serializer} from './ChannelSerializer';

function getFunctionParameters(publishMessage, channelParameters) {
  const functionParameters = ['LoggingInterface logger', 'IEncodedConnection connection'];
  if (messageHasNotNullPayload(publishMessage.payload())) {
    const messageType = getMessageType(publishMessage);
    functionParameters.push(`${messageType} requestMessage`);
  }
  if (channelParameters.length > 0) {
    functionParameters.push(realizeParametersForChannel(channelParameters));
  }
  return functionParameters;
}
function getPublishCode(publishMessage, realizedChannelPath) {
  let publishCode = `connection.Publish($${realizedChannelPath}, Encoding.UTF8.GetBytes("null"));`;
  if (messageHasNotNullPayload(publishMessage.payload())) {
    publishCode = `var serializedObject = JsonSerializerSupport(logger, requestMessage); 
  connection.Publish(${realizedChannelPath}, serializedObject);`;
  }
  return publishCode;
}

/**
 * Returns the channel public function that publish message through the client.
 * 
 * @param {*} channelName 
 * @param {*} channelParameters 
 * @param {*} publishMessage 
 * @param {*} params 
 */
export default function publish(channelName, channelParameters, publishMessage, params) {
  const functionParameters = getFunctionParameters(publishMessage, channelParameters);
  const realizedChannelPath = realizeChannelName(channelParameters, channelName);
  const publishCode = getPublishCode(publishMessage, realizedChannelPath);
  return `
${serializer(publishMessage, params)}

public static void Publish(
  ${functionParameters.join(',\n')}
){
  logger.Debug("Publishing to channel: " + $${realizedChannelPath});
  ${publishCode}
}`;
}
