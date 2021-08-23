import { camelCase, realizeChannelNameWithoutParameters, castToCType } from '../../utils/general';

function getParameterSplitVariables(channelParameters) {
  const parameterSplitVariables = [];
  let prevParameterSplitVariableName = undefined;
  for (const [parameterName,] of channelParameters) {
    const camelCasedParameterName = camelCase(parameterName);
    if (prevParameterSplitVariableName !== undefined) {
      parameterSplitVariables.push(`var ${camelCasedParameterName}Split = ${prevParameterSplitVariableName}Split[1].Split(new string[] { "{${parameterName}}" }, StringSplitOptions.None);`);
    } else {
      parameterSplitVariables.push(`var ${camelCasedParameterName}Split = unmodifiedChannel.Split(new string[] { "{${parameterName}}" }, StringSplitOptions.None);`);
    }
    prevParameterSplitVariableName = camelCasedParameterName;
  }
  return parameterSplitVariables;
}

function getParameterVariables(channelParameters) {
  const parameterVariables = [];
  let prevParameterVariableName;
  let counter = 0;
  for (const [parameterName, parameter] of channelParameters) {
    const camelCasedParameterName = camelCase(parameterName);
    if (counter === 0) {
      parameterVariables.push('channel = channel.Substring(splits[0].Length);');
    } else {
      parameterVariables.push(`channel = channel.Substring(${prevParameterVariableName}End+splits[${counter}].Length);`);
    }
    parameterVariables.push(`var ${camelCasedParameterName}End = channel.IndexOf(splits[${counter+1}]);`);
    const paramVarToCast = `channel.Substring(0, ${camelCasedParameterName}End)`;
    parameterVariables.push(`var ${camelCasedParameterName}Param = ${castToCType(parameter.schema().type(), paramVarToCast)};`);
    counter++;
    prevParameterVariableName = camelCasedParameterName;
  }
  return parameterVariables;
}

function getParameterSplits(channelParameters) {
  const parameterSplits = [];
  let lastParameterName;
  for (const [parameterName,] of channelParameters) {
    const camelCasedParameterName = camelCase(parameterName);
    parameterSplits.push(`${camelCasedParameterName}Split[0]`);
    lastParameterName = camelCasedParameterName;
  }
  parameterSplits.push(`${lastParameterName}Split[1]`);
  return parameterSplits;
}

/**
 * Returns the channel parameter unwrapping code.
 * 
 * Once a message is received, a topic is received along side it, 
 * this could be "streetlight.1.event.turnon" where the AsyncAPI channel is "streetlight.{streetlight_id}.event.turnon".
 * 
 * This unwrapping code makes sure that you get the received parameter "const streetlight_id = 1".
 * 
 * @param {*} channelName 
 * @param {*} channelParameters 
 */
export function channelParameterUnwrap(channelName, channelParameters) {
  if (channelParameters.length === 0) return '';
  const parameterSplitVariables = getParameterSplitVariables(channelParameters);
  const parameterSplits = getParameterSplits(channelParameters);
  const parameterVariables = getParameterVariables(channelParameters);

  return `var unmodifiedChannel = ${realizeChannelNameWithoutParameters(channelName)};
  var channel = args.Subject;
  ${parameterSplitVariables.join('\n')}
  String[] splits = {
    ${parameterSplits.join(',\n')}
  };
  ${parameterVariables.join('\n')}`;
}
