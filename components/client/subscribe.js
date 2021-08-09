import { pascalCase, realizeParametersForChannelWithoutType, realizeParametersForChannel } from '../../utils/general';

export default function subscribe(channelName, message, channelParameters) {
  const pascalChannel = pascalCase(channelName);
  const functionParameters = [`${pascalChannel}OnRequest onRequest`];
  const operationFunctions = ['logger', 'connection', 'onRequest'];
  if (channelParameters.length > 0) {
    functionParameters.push(realizeParametersForChannel(channelParameters)); 
    operationFunctions.push(realizeParametersForChannelWithoutType(channelParameters));
  }
  
  return `public IAsyncSubscription SubscribeTo${pascalChannel}(
  ${functionParameters.join(',\n')}
){
  if (IsConnected())
  {
    return ${pascalChannel}.Subscribe(
      ${operationFunctions.join(',\n')}
  }
  else
  {
    throw new ClientNotConnected();
  }
}`;
}
