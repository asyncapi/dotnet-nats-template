import { File } from '@asyncapi/generator-react-sdk';

export default function asyncapiNatsClient({ params }) {
  const version = `<Version>${params.version}</Version>`;
  const projectName = params.projectName;
  const targetFramework = `<TargetFrameworks>${params.targetFramework}</TargetFrameworks>`;
  let repositoryUrl = ''; 
  if (params.repositoryUrl) {
    repositoryUrl = `<RepositoryUrl>${params.repositoryUrl}</RepositoryUrl>`;
  }
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
  let serializationLibrary = '';
  if (params.serializationLibrary) {
    if (params.serializationLibrary === 'json') {
      serializationLibrary = '<PackageReference Include="System.Text.Json" Version="5.0.2" />';
    } else {
      serializationLibrary = '<PackageReference Include="Newtonsoft.Json" Version="13.0.1" />';
    }
  }
  return <File name={`${projectName}.csproj`}>
    {`
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    ${targetFramework}
    <RootNamespace>Asyncapi.Nats.Client</RootNamespace>
    ${version}
    ${repositoryUrl}
    ${packageVersion}
    ${assemblyVersion}
    ${fileVersion}
  </PropertyGroup>

  <ItemGroup>
    <None Remove="NATS.Client" />
  </ItemGroup>
  <ItemGroup>
    <PackageReference Include="NATS.Client" Version="1.0.1" />
    ${serializationLibrary}
    <PackageReference Include="Microsoft.CSharp" Version="4.7.0" />
  </ItemGroup>
</Project>`
    }
  </File>;
}
