<h1 align="center">.NET C# NATS template</h1>

<p align="center">
  <em>This is a .NET C# NATS template for the AsyncAPI generator</em>
</p>

This template is for generating a .NET C# wrapper for the NATS client based on your AsyncAPI document. The template is based on the [nats.net](https://github.com/nats-io/nats.net) library.

Have you found a bug or have an idea for improvement? Feel free to contribute! See [the contribution guidelines](#Contributing) how to do so.

# How to use
Information about the generated files and a description can be found under [the documentation folder](./docs/general.md).

## Requirements
* @asyncapi/generator < v2.0.0 >v1.1.1

Install the generator through [npm or run it from docker official installer](https://github.com/asyncapi/generator#install).

## Example usage
Given any AsyncAPI file (`AsyncAPI.yml`) first generate the client with the [AsyncAPI generator](https://github.com/asyncapi/generator) such as 
```bash
ag --install --output ./nats-client ./AsyncAPI.yml @asyncapi/dotnet-nats-template
```

# Contributing

Before contributing please read the [CONTRIBUTING](CONTRIBUTING.md) document.

