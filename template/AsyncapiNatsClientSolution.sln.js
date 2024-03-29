﻿
import { File } from '@asyncapi/generator-react-sdk';

export default function asyncapiNatsClientSolution({ params }) {
  const projectName = params.projectName;
  return <File name={`${projectName}Solution.sln`}>
    {`
Microsoft Visual Studio Solution File, Format Version 12.00
# Visual Studio Version 16
VisualStudioVersion = 16.0.810.7
MinimumVisualStudioVersion = 10.0.40219.1
Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "${projectName}Tests", "${projectName}Tests\\${projectName}Tests.csproj", "{84B3B919-E4BC-4C09-86B2-F71EF2E66B86}"
EndProject
Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "${projectName}", "${projectName}\\${projectName}.csproj", "{ECF13126-517F-447A-AA07-3CBCC34E8E49}"
EndProject
Global
	GlobalSection(SolutionConfigurationPlatforms) = preSolution
		Debug|Any CPU = Debug|Any CPU
		Release|Any CPU = Release|Any CPU
	EndGlobalSection
	GlobalSection(ProjectConfigurationPlatforms) = postSolution
		{84B3B919-E4BC-4C09-86B2-F71EF2E66B86}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{84B3B919-E4BC-4C09-86B2-F71EF2E66B86}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{84B3B919-E4BC-4C09-86B2-F71EF2E66B86}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{84B3B919-E4BC-4C09-86B2-F71EF2E66B86}.Release|Any CPU.Build.0 = Release|Any CPU
		{ECF13126-517F-447A-AA07-3CBCC34E8E49}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{ECF13126-517F-447A-AA07-3CBCC34E8E49}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{ECF13126-517F-447A-AA07-3CBCC34E8E49}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{ECF13126-517F-447A-AA07-3CBCC34E8E49}.Release|Any CPU.Build.0 = Release|Any CPU
	EndGlobalSection
	GlobalSection(SolutionProperties) = preSolution
		HideSolutionNode = FALSE
	EndGlobalSection
	GlobalSection(ExtensibilityGlobals) = postSolution
		SolutionGuid = {1048B10D-19C0-4D79-84D8-9356CA804ACF}
	EndGlobalSection
EndGlobal
`
    }
  </File>;
}
