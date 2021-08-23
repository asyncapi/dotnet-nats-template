import { pascalCase, realizeParametersForChannelWithoutType, realizeParametersForChannel } from '../../utils/general';

function getFunctionAndOperationParameters(pascalChannel, channelParameters) {
  const functionParameters = [`${pascalChannel}OnRequest onRequest`];
  const operationParameters = ['logger', 'connection', 'onRequest'];
  if (channelParameters.length > 0) {
    functionParameters.push(realizeParametersForChannel(channelParameters)); 
    operationParameters.push(realizeParametersForChannelWithoutType(channelParameters));
  }
  return {functionParameters, operationParameters};
}

/**
 * Returns the client function wrapper which calls the channel subscribe function.
 * 
 * @param {*} channelName 
 * @param {*} channelParameters
 */
export default function subscribe(channelName, channelParameters) {
  const pascalChannel = pascalCase(channelName);
  const {functionParameters, operationParameters} = getFunctionAndOperationParameters(pascalChannel, channelParameters);
  
  return `public IAsyncSubscription SubscribeTo${pascalChannel}(
  ${functionParameters.join(',\n')}
){
  if (IsConnected())
  {
    return ${pascalChannel}.Subscribe(${operationParameters.join(',\n')});
  }
  else
  {
    throw new ClientNotConnected();
  }
}`;
}
