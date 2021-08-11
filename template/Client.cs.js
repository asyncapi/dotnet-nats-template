import { File } from '@asyncapi/generator-react-sdk';
import standard from '../components/client/standard';
// eslint-disable-next-line no-unused-vars
import { AsyncAPIDocument } from '@asyncapi/parser';
import { getMessageType, messageHasNotNullPayload, pascalCase, realizeParametersForChannel } from '../utils/general';
import subscribe from '../components/client/subscribe';
import publish from '../components/client/publish';

/**
 * @typedef RenderArgument
 * @type {object}
 * @property {AsyncAPIDocument} asyncapi received from the generator.
 */

/**
 * 
 * @param {RenderArgument} param0 
 * @returns 
 */
export default function clientFile({ asyncapi }) {
  const channelIterator = Object.entries(asyncapi.channels());
  const delegates = [];
  for (const [channelName, channel] of channelIterator) {
    if (!channel.hasPublish()) continue;
    const channelParameterEntries = Object.entries(channel.parameters());
    const channelPublishMessage = channel.publish().message(0);
    const delegateParameters = [];
    if (messageHasNotNullPayload(channelPublishMessage.payload())) {
      const messageType = getMessageType(channelPublishMessage);
      delegateParameters.push(`${messageType}NameSpace.${messageType} request`);
    }
    if (channel.parameters().length > 0) {
      delegateParameters.push(realizeParametersForChannel(channelParameterEntries));
    }
    delegates.push(`public delegate void ${pascalCase(channelName)}OnRequest(
      ${delegateParameters.join(',\n')}
    );`);
  }
  const channels = [];
  for (const [channelName, channel] of channelIterator) {
    const channelParameterEntries = Object.entries(channel.parameters());
    if (channel.hasSubscribe()) {
      channels.push(subscribe(channelName, channelParameterEntries));
    }
    if (channel.hasPublish()) {
      channels.push(publish(channelName, channel.publish().message(0), channelParameterEntries));
    }
  }

  return <File name={'Client.cs'}>
    {
      `namespace Dotnet.Nats.Client
{
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Text;
  using System.Threading.Tasks;
  using Dotnet.Nats.Client.channels;
  using NATS.Client;

  ${delegates.join('\n')}

  public class NatsClient
  {
    ${standard()}
    
    public NatsClient()
    {
        this.Logger = new DefaultLogger();
    }
    public NatsClient(LoggingInterface logger)
    {
        this.Logger = logger;
    }
    ${channels.join('\n')}
  }
}`
    }
  </File>;
}
