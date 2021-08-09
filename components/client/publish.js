import { getMessageType, messageHasNotNullPayload, pascalCase, realizeParametersForChannelWithoutType, realizeParametersForChannel } from '../../utils/general';

export default function publish(channelName, message, channelParameters) {
  const functionParameters = [];
  const operationFunctions = ['logger', 'connection'];
  if (messageHasNotNullPayload(message.payload())) {
    const messageType = getMessageType(message);
    functionParameters.push(`${messageType}NameSpace.${messageType} requestMessage `);
    operationFunctions.push('requestMessage');
  }
  if (channelParameters.length > 0) {
    functionParameters.push(realizeParametersForChannel(channelParameters)); 
    operationFunctions.push(realizeParametersForChannelWithoutType(channelParameters));
  }
  const pascalChannel = pascalCase(channelName);
  
  return `public void PublishTo${pascalChannel}(
  ${functionParameters.join(',\n')}
)
  {
  if (IsConnected())
  {
    ${pascalChannel}.Publish(
    ${operationFunctions.join(',\n')});
  }
  else
  {
    throw new ClientNotConnected();
  }
}`;
}
