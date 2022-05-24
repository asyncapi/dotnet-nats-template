import { File } from '@asyncapi/generator-react-sdk';

export default function asyncapiNatsClientTests({ params }) {
  const projectName = params.projectName;
  return <File name={`${projectName}Test.csproj`}>
    {`
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
    <RootNamespace>Asyncapi.Nats.Client.Test</RootNamespace>
    <IsPackable>false</IsPackable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.5.0" />
    <PackageReference Include="xunit" Version="2.4.0" />
    <PackageReference Include="xunit.runner.visualstudio" Version="2.4.0" />
    <PackageReference Include="coverlet.collector" Version="1.2.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\\${projectName}\\${projectName}.csproj" />
  </ItemGroup>

</Project>
`
    }
  </File>;
}
