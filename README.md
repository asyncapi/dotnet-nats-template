<h1 align="center">.NET NATS template</h1>
<p align="center">
  <em>This is a .NET NATS template for the AsyncAPI generator.</em>
</p>

This template is for generating a .NET NATS client based on an AsyncAPI document. The template is based on the [nats.net](https://github.com/nats-io/nats.net) library.

# How to use
Example generations can be found under [examples](./examples) which includes [publish and subscribe](./examples/publish%20subscribe) example as well as [request and reply](./examples/request%20reply).

## Requirements
* @asyncapi/generator >= v1.0.0-rc.11

Install the generator through [npm or run it from docker official installer](https://github.com/asyncapi/generator#install).

## Example usage
Given any AsyncAPI file (`AsyncAPI.yml`) first generate the client with the [AsyncAPI generator](https://github.com/asyncapi/generator) such as 
```bash
ag --install --output ./nats-client ./AsyncAPI.yml @asyncapi/dotnet-nats-template --force-write --param "generateTestClient=true"
```
