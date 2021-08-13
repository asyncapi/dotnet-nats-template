import { camelCase, messageHasNotNullPayload, pascalCase, realizeChannelName, realizeParametersForChannel } from '../../utils/general';
import { deserializer } from './ChannelDeserializer';
import {channelParameterUnwrap} from './ChannelParameterUnwrap';

function getFunctionParameters(channelParameters, channelName) {
  const functionParameters = ['LoggingInterface logger', 'IEncodedConnection connection', `${pascalCase(channelName)}OnRequest onRequest`];
  if (channelParameters.length > 0) {
    functionParameters.push(realizeParametersForChannel(channelParameters));
  }
  return functionParameters;
}
function getRequestParameters(subscriptionMessage, channelParameters) {
  const requestParameters = [messageHasNotNullPayload(subscriptionMessage.payload()) ? 'deserializedMessage' : 'null'];
  for (const [parameterName,] of channelParameters) {
    requestParameters.push(`${camelCase(parameterName)}Param`);
  }
  return requestParameters;
}
function getSubscribeParameters(realizedChannelPath, queue) {
  const subscribeParameters = [realizedChannelPath];
  if (queue) {
    subscribeParameters.push(`"${queue}"`);
  }
  subscribeParameters.push('handler');
  return subscribeParameters;
}
/**
 * Returns the channel subscribe function that subscribes the client to topic
 * 
 * @param {*} channelName 
 * @param {*} channelParameters 
 * @param {*} subscriptionMessage 
 * @param {*} queue 
 */
export default function subscribe(channelName, channelParameters, subscriptionMessage, queue = undefined) {
  const functionParameters = getFunctionParameters(channelParameters, channelName);
  const requestParameters = getRequestParameters(subscriptionMessage, channelParameters);
  const realizedChannelPath = realizeChannelName(channelParameters, channelName);
  const subscribeParameters = getSubscribeParameters(realizedChannelPath, queue);

  return `
  ${deserializer(subscriptionMessage)}
  public static IAsyncSubscription Subscribe(
    ${functionParameters.join(',\n')}
  )
  {
    EventHandler<EncodedMessageEventArgs> handler = (sender, args) =>
    {
      logger.Debug("Got message for channel subscription: " + $${realizedChannelPath});
      var deserializedMessage = JsonDeserializerSupport(logger, (byte[])args.ReceivedObject);

      ${channelParameterUnwrap(channelName, channelParameters)}
      
      onRequest(${requestParameters.join(',\n')});
    };
    logger.Debug("Subscribing to: " + $${realizedChannelPath});
    return connection.SubscribeAsync($${subscribeParameters.join(',')});
  }`;
}
