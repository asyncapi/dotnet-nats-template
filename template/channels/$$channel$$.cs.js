import { File } from '@asyncapi/generator-react-sdk';
import { pascalCase } from '../../utils/general';
// eslint-disable-next-line no-unused-vars
import { Channel } from '@asyncapi/parser';
import publish from '../../components/channel/publish';
import subscribe from '../../components/channel/subscribe';

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
  return <File name={`${pascalCase(channelName)}.cs`}>
    {
      `using NATS.Client;
using System;
using System.Text;

namespace Dotnet.Nats.Client.channels
{
  class ${pascalCase(channelName)}
  {
${channel.hasSubscribe() && subscribe(channelName, channel.parameters(), channel.subscribe().message(0)), channel.subscribe().hasBinding('nats') ? channel.subscribe().binding('nats').queue : undefined}
${channel.hasPublish() && publish(channelName, channel.parameters(), channel.publish().message(0))}
  }
}`
    }
  </File>;
}
