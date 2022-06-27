<h1 align="center">.NET C# NATS template</h1>

<p align="center">
  <em>This is a .NET C# NATS template for the AsyncAPI generator</em>
</p>

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This template is for generating a .NET C# wrapper for the NATS client based on your AsyncAPI document. The template is based on the [nats.net](https://github.com/nats-io/nats.net) library.

Have you found a bug or have an idea for improvement? Feel free to contribute! See [the contribution guidelines](#Contributing) how to do so.

## Example usage
Given any AsyncAPI file (`AsyncAPI.yml`) first generate the client with the [AsyncAPI generator](https://github.com/asyncapi/generator) such as 
```bash
ag --install --output ./nats-client ./AsyncAPI.yml @asyncapi/dotnet-nats-template
```

# How to use
The generated output shall be seen a separate library (similar to any REST API client), that can be interacted with. It generates all the necessary functionality for you to easily interact with the NATS broker based on the AsyncAPI definition of the application.

## Requirements
* @asyncapi/generator < v2.0.0 >v1.1.1

Install the generator through [npm or run it from docker official installer](https://github.com/asyncapi/generator#install).


## Template configuration

<!--  
This information should match the information provided in the template configuration under the `parameters` property.
-->

You can configure this template by passing different parameters in the Generator CLI: `-p PARAM1_NAME=PARAM1_VALUE -p PARAM2_NAME=PARAM2_VALUE`

Name | Description | Required | Default | Allowed Values | Example
---|---|---|---|---|---
version | Version to use for the generated library. | No | `0.0.1` | string | `1.0.1`
repositoryUrl | Repository url for the project file, often needed for release pipelines. | No | None | string | `https://github.com/GamingAPI/rust-csharp-game-api.git`
packageVersion | PackageVersion to use for the generated library. | No | None | string | `1.0.1`
assemblyVersion | AssemblyVersion to use for the generated library. | No | None | string | `1.0.1.0`
fileVersion | FileVersion to use for the generated library. | No | None | string | `1.0.1.0`

# Contributing

Before contributing please read the [CONTRIBUTING](CONTRIBUTING.md) document.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jonaslagoni"><img src="https://avatars.githubusercontent.com/u/13396189?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jonas Lagoni</b></sub></a><br /><a href="https://github.com/asyncapi/dotnet-nats-template/commits?author=jonaslagoni" title="Code">💻</a> <a href="#maintenance-jonaslagoni" title="Maintenance">🚧</a> <a href="#question-jonaslagoni" title="Answering Questions">💬</a> <a href="#ideas-jonaslagoni" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/asyncapi/dotnet-nats-template/commits?author=jonaslagoni" title="Documentation">📖</a> <a href="https://github.com/asyncapi/dotnet-nats-template/issues?q=author%3Ajonaslagoni" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://dev.to/derberg"><img src="https://avatars.githubusercontent.com/u/6995927?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lukasz Gornicki</b></sub></a><br /><a href="https://github.com/asyncapi/dotnet-nats-template/pulls?q=is%3Apr+reviewed-by%3Aderberg" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/YoeriVD"><img src="https://avatars.githubusercontent.com/u/2865793?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yoeri Van Damme</b></sub></a><br /><a href="https://github.com/asyncapi/dotnet-nats-template/commits?author=YoeriVD" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!