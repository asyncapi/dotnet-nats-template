import { camelCase, messageHasNotNullPayload, pascalCase, realizeChannelName, realizeParametersForChannel } from '../../utils/general';
import { deserializer } from './ChannelDeserializer';
import {channelParameterUnwrap} from './ChannelParameterUnwrap';

export default function subscribe(channelName, channelParameters, subscriptionMessage, queue = undefined) {
  const functionParameters = ['LoggingInterface logger', 'IEncodedConnection connection', `${pascalCase(channelName)}OnRequest onRequest`];
  if (channelParameters.length > 0) {
    functionParameters.push(realizeParametersForChannel(channelParameters));
  }

  const requestParameters = [messageHasNotNullPayload(subscriptionMessage.payload()) ? 'deserializedMessage' : 'null'];
  for (const [parameterName,] of channelParameters) {
    requestParameters.push(`${camelCase(parameterName)}Param`);
  }
  const realizedChannelPath = realizeChannelName(channelParameters, channelName);

  const subscribeParameters = [realizedChannelPath];
  if (queue) {
    subscribeParameters.push(`"${queue}"`);
  }
  subscribeParameters.push('handler');
  return `
  ${deserializer(subscriptionMessage)}
  public static IAsyncSubscription Subscribe(
    ${functionParameters.join(',\n')}
  {
    EventHandler<EncodedMessageEventArgs> handler = (sender, args) =>
    {
      logger.Debug("Got message for channel subscription: " + ${realizedChannelPath});
      var deserializedMessage = JsonDeserializer(logger, (byte[])args.ReceivedObject);

      ${channelParameterUnwrap(channelName, channelParameters)}
      
      onRequest(${requestParameters.join(',\n')});
    };
    logger.Debug("Subscribing to: " + ${realizedChannelPath});
    return connection.SubscribeAsync(${subscribeParameters.join(',')});
  }`;
}
