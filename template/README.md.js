import { File } from '@asyncapi/generator-react-sdk';

export default function readmeFile({ asyncapi }) {
  return <File name={'README.md'}>
    {
      `
<h1 align="center">.NET C# NATS client wrapper</h1>
<p align="center">
  <em>This is a generated .NET C# NATS client - ${asyncapi.info().title() }.</em>
</p>

**We highly recommend you do not modify this client in any way since it is build for you to re-generate it when your AsyncAPI document changes.** 

${asyncapi.info().description() || ''}
    `
    }
  </File>;
}
