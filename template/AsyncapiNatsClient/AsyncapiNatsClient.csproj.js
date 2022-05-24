import { File } from '@asyncapi/generator-react-sdk';

export default function asyncapiNatsClient({ params }) {
  const version = `<Version>${params.version}</Version>`;
  const projectName = params.projectName;
  return <File name={`${projectName}.csproj`}>
    {`
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFrameworks>netstandard2.0;netstandard2.1</TargetFrameworks>
    <RootNamespace>Asyncapi.Nats.Client</RootNamespace>
    ${version}
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
