import { File } from '@asyncapi/generator-react-sdk';
import standard from '../../components/client/standard';
// eslint-disable-next-line no-unused-vars
import { AsyncAPIDocument } from '@asyncapi/parser';
import { getMessageType, messageHasNotNullPayload, pascalCase, realizeParametersForChannel } from '../../utils/general';
import subscribe from '../../components/client/subscribe';
import publish from '../../components/client/publish';
import jetStreamPublish from '../../components/client/jetStreamPublish';
function getDelegates(channels) {
  const delegates = [];
  for (const [channelName, channel] of channels) {
    if (channel.hasSubscribe()) continue;
    const channelParameterEntries = Object.entries(channel.parameters());
    const channelSubscribeMessage = channel.publish().message(0);
    const delegateParameters = [];
    if (messageHasNotNullPayload(channelSubscribeMessage.payload())) {
      const messageType = getMessageType(channelSubscribeMessage);
      delegateParameters.push(`${messageType} request`);
    }
    if (channelParameterEntries.length > 0) {
      delegateParameters.push(realizeParametersForChannel(channelParameterEntries));
    }
    delegates.push(`public delegate void ${pascalCase(channelName)}OnRequest(
      ${delegateParameters.join(',\n')}
    );`);
  }
  return delegates;
}
function getChannelWrappers(channels) {
  const channelWrappers = [];
  for (const [channelName, channel] of channels) {
    const channelParameterEntries = Object.entries(channel.parameters());
    if (channel.hasPublish()) {
      channelWrappers.push(subscribe(channelName, channelParameterEntries));
    }
    if (channel.hasSubscribe()) {
      channelWrappers.push(publish(channelName, channel.subscribe().message(0), channelParameterEntries));
      channelWrappers.push(jetStreamPublish(channelName, channel.subscribe().message(0), channelParameterEntries));
    }
  }
  return channelWrappers;
}
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
  const delegates = getDelegates(channelIterator);
  const channelWrappers = getChannelWrappers(channelIterator);

  return <File name={'Client.cs'}>
    {
      `using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Asyncapi.Nats.Client.Channels;
using Asyncapi.Nats.Client.Models;
using NATS.Client;
using NATS.Client.JetStream;
namespace Asyncapi.Nats.Client
{

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
    ${channelWrappers.join('\n')}
  }
}`
    }
  </File>;
}
