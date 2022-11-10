import { getMessageType, messageHasNotNullPayload, pascalCase, realizeParametersForChannelWithoutType, realizeParametersForChannel } from '../../utils/general';

function getFunctionAndOperationParameters(message, channelParameters) { 
  const functionParameters = [];
  const operationParameters = ['logger', 'jetstream'];
  if (messageHasNotNullPayload(message.payload())) {
    const messageType = getMessageType(message);
    functionParameters.push(`${messageType} requestMessage`);
    operationParameters.push('requestMessage');
  }
  if (channelParameters.length > 0) {
    functionParameters.push(realizeParametersForChannel(channelParameters)); 
    operationParameters.push(realizeParametersForChannelWithoutType(channelParameters));
  }
  return {functionParameters, operationParameters};
}

/**
 * Returns the client function wrapper which calls the channel publish function.
 * 
 * @param {*} channelName 
 * @param {*} message 
 * @param {*} channelParameters 
 */
export default function jetStreamPublishTo(channelName, message, channelParameters) {
  const pascalChannel = pascalCase(channelName);
  const {functionParameters, operationParameters} = getFunctionAndOperationParameters(message, channelParameters);
  return `public void JetStreamPublishTo${pascalChannel}(
  ${functionParameters.join(',\n')}
)
{
  if (IsConnected())
  {
    ${pascalChannel}.JetStreamPublish(${operationParameters.join(',\n')});
  }
  else
  {
    throw new ClientNotConnected();
  }
}`;
}
