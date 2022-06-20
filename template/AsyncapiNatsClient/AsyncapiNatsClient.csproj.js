import { File } from '@asyncapi/generator-react-sdk';
// eslint-disable-next-line no-unused-vars
import { AsyncAPIDocument } from '@asyncapi/parser';

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
export default function asyncapiNatsClient({ params }) {
  const version = `<Version>${params.version}</Version>`;
  let packageVersion = '';
  if (params.packageVersion !== undefined) {
    packageVersion = `<PackageVersion>${params.packageVersion}</PackageVersion>`;
  }
  let assemblyVersion = '';
  if (params.assemblyVersion !== undefined) {
    assemblyVersion = `<AssemblyVersion>${params.assemblyVersion}</AssemblyVersion>`;
  }
  let fileVersion = '';
  if (params.fileVersion !== undefined) {
    fileVersion = `<FileVersion>${params.fileVersion}</FileVersion>`;
  }
  return <File name={'AsyncapiNatsClient.csproj'}>
    {`
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFrameworks>netstandard2.0;netstandard2.1</TargetFrameworks>
    <RootNamespace>Asyncapi.Nats.Client</RootNamespace>
    ${version}
    ${packageVersion}
    ${assemblyVersion}
    ${fileVersion}
  </PropertyGroup>

  <ItemGroup>
    <None Remove="NATS.Client" />
    <None Remove="System.Text.Json" />
  </ItemGroup>
  <ItemGroup>
    <PackageReference Include="NATS.Client" Version="0.12.0" />
    <PackageReference Include="System.Text.Json" Version="5.0.2" />
  </ItemGroup>
</Project>`
    }
  </File>;
}
