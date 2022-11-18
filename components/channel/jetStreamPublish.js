import { getMessageType, messageHasNotNullPayload, realizeChannelName, realizeParametersForChannel } from '../../utils/general';

function getFunctionParameters(publishMessage, channelParameters) {
  const functionParameters = ['LoggingInterface logger', 'IJetStream connection'];
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
 * Returns the channel public function that publish jetstream messages
 * 
 * @param {*} channelName 
 * @param {*} channelParameters 
 * @param {*} publishMessage 
 */
export default function jetStreamPublish(channelName, channelParameters, publishMessage) {
  const functionParameters = getFunctionParameters(publishMessage, channelParameters);
  const realizedChannelPath = realizeChannelName(channelParameters, channelName);
  const publishCode = getPublishCode(publishMessage, realizedChannelPath);
  return `public static void JetStreamPublish(
  ${functionParameters.join(',\n')}
){
  logger.Debug("Publishing to jetstream channel: " + $${realizedChannelPath});
  ${publishCode}
}`;
}
