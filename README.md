<h1 align="center">.NET C# NATS template</h1>

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#Contributors-✨)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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
The leading examples are both in TypeScript and in Node.js since this template can be used for both. The example code will be used later in the documentation to explain the different features.

Given any AsyncAPI file (`AsyncAPI.yml`) first generate the client with the [AsyncAPI generator](https://github.com/asyncapi/generator) such as 
```bash
ag --install --output ./nats-client ./AsyncAPI.yml @asyncapi/dotnet-nats-template
```

# Contributing

Before contributing please read the [CONTRIBUTING](CONTRIBUTING.md) document.

# Contributors ✨
This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jonaslagoni"><img src="https://avatars.githubusercontent.com/u/13396189?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jonas Lagoni</b></sub></a><br /><a href="https://github.com/asyncapi/ts-nats-template/issues?q=author%3Ajonaslagoni" title="Bug reports">🐛</a> <a href="#maintenance-jonaslagoni" title="Maintenance">🚧</a> <a href="https://github.com/asyncapi/ts-nats-template/commits?author=jonaslagoni" title="Code">💻</a> <a href="https://github.com/asyncapi/ts-nats-template/commits?author=jonaslagoni" title="Documentation">📖</a> <a href="#ideas-jonaslagoni" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-jonaslagoni" title="Answering Questions">💬</a> <a href="https://github.com/asyncapi/ts-nats-template/commits?author=jonaslagoni" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

