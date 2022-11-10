import { File } from '@asyncapi/generator-react-sdk';
import { pascalCase } from '../../../utils/general';
// eslint-disable-next-line no-unused-vars
import { Channel } from '@asyncapi/parser';
import publish from '../../../components/channel/publish';
import subscribe from '../../../components/channel/subscribe';
import jetStreamPublish from '../../../components/channel/jetStreamPublish';
import { serializer } from '../../../components/channel/ChannelSerializer';

/**
 * @typedef RenderArgument
 * @type {object}
 * @property {Channel} channel 
 * @property {string} channelName 
 */

/**
 * 
 * @param {RenderArgument} param0 
 * @returns 
 */
export default function clientFile({ channelName, channel }) {
  const channelParameterEntries = Object.entries(channel.parameters());
  let channelCode = '';
  if (channel.hasPublish()) {
    channelCode = `${channel.hasPublish() ? subscribe(channelName, channelParameterEntries, channel.publish().message(0), channel.publish().hasBinding('nats') ? channel.subscribe().binding('nats').queue : undefined) : ''}`;
  } else if (channel.hasSubscribe()) {
    channelCode = `${serializer(channel.subscribe().message(0))}
${publish(channelName, channelParameterEntries, channel.subscribe().message(0))}
${jetStreamPublish(channelName, channelParameterEntries, channel.subscribe().message(0))}`;
  }
  return <File name={`${pascalCase(channelName)}.cs`}>
    {
      `using NATS.Client;
using System;
using System.Text;
using System.Text.Json;
using Asyncapi.Nats.Client.Models;
using NATS.Client.JetStream;

namespace Asyncapi.Nats.Client.Channels
{
  class ${pascalCase(channelName)}
  {
    ${channelCode}
  }
}`
    }
  </File>;
}
