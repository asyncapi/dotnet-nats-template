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
  const delegates = [];
  for (const [channelName, channel] of asyncapi.channels().filter(([, channel]) => {return channel.hasPublish();})) {
    const delegateParameters = [];
    if (messageHasNotNullPayload(channel.publish().message(0).payload())) {
      const messageType = getMessageType(channel.publish().message(0));
      delegateParameters.push(`${messageType}NameSpace.${messageType} request`);
    }
    if (channel.parameters().length > 0) {
      delegateParameters.push(realizeParametersForChannel(channel.parameters()));
    }
    delegates.push(`public delegate void ${pascalCase(channelName)}OnRequest(
      ${delegateParameters.join(',\n')}
    );`);
  }
  const channels = [];
  for (const [channelName, channel] of asyncapi.channels()) {
    if (channel.hasSubscribe()) {
      channels.push(subscribe(asyncapi.defaultContentType(), channelName, channel.parameters()));
    }
    if (channel.hasPublish()) {
      channels.push(publish(asyncapi.defaultContentType(), channelName, channel.subscribe().message(0), channel.description(), channel.parameters()));
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
