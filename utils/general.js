import _ from 'lodash';
// eslint-disable-next-line no-unused-vars
import { Message, Schema } from '@asyncapi/parser';
import { FormatHelpers } from '@asyncapi/modelina';
const contentTypeJSON = 'application/json';
const contentTypeString = 'text/plain';
const contentTypeBinary = 'application/octet-stream';

/**
 * @typedef TemplateParameters
 * @type {object}
 * @property {boolean} generateTestClient - whether or not test client should be generated.
 * @property {boolean} promisifyReplyCallback - whether or not reply callbacks should be promisify.
 */

/**
 * Should the callbacks be promisify.
 *
 * @param {TemplateParameters} params passed to the template
 * @returns {boolean} should it promisify callbacks
 */
export function shouldPromisifyCallbacks(params) {
  return params.promisifyReplyCallback;
}

export function camelCase(string) {
  return _.camelCase(string);
}
export function pascalCase(string) {
  string = _.camelCase(string);
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function kebabCase(string) {
  return _.kebabCase(string);
}

/**
 * Returns the schema file name
 *
 * @param {string} schemaName
 * @returns
 */
export function getSchemaFileName(schemaName) {
  return FormatHelpers.toPascalCase(schemaName);
}

/**
 * Figure out if our message content type or default content type matches a given payload.
 *
 * @param {string} messageContentType to check against payload
 * @param {string} defaultContentType to check against payload
 * @param {string} payload to check
 */
function containsPayload(messageContentType, defaultContentType, payload) {
  // eslint-disable-next-line sonarjs/prefer-single-boolean-return
  if (
    (messageContentType !== undefined &&
      messageContentType.toLowerCase() === payload) ||
    (defaultContentType !== undefined && defaultContentType === payload)
  ) {
    return true;
  }
  return false;
}
export function isBinaryPayload(messageContentType, defaultContentType) {
  return containsPayload(messageContentType, defaultContentType, contentTypeBinary);
}
export function isStringPayload(messageContentType, defaultContentType) {
  return containsPayload(messageContentType, defaultContentType, contentTypeString);
}
export function isJsonPayload(messageContentType, defaultContentType) {
  return containsPayload(messageContentType, defaultContentType, contentTypeJSON);
}

/**
 * Checks if the message payload is of type null
 *
 * @param {Schema} messagePayload to check
 * @returns {boolean} does the payload contain null type
 */
export function messageHasNotNullPayload(messagePayload) {
  return `${messagePayload.type()}` !== 'null';
}

/**
 * Get message type ensure that the correct message type is returned.
 *
 * @param {Message} message to find the message type for
 */
export function getMessageType(message) {
  if (`${message.payload().type()}` === 'null') {
    return 'null';
  }
  return `${getSchemaFileName(message.payload().uid())}`;
}

/**
 * Convert JSON schema draft 7 types to csharp types
 * @param {*} jsonSchemaType
 * @param {*} property
 */
export function toCType(jsonSchemaType, property) {
  switch (jsonSchemaType.toLowerCase()) {
  case 'string':
    return 'String';
  case 'integer':
    return 'int';
  case 'number':
    return 'decimal';
  case 'boolean':
    return 'bool';
  case 'object':
    if (property) {
      return `${property.uid()}Schema`;
    }
    return 'object';

  default: return 'object';
  }
}

/**
 * Cast JSON schema variable to csharp type
 *
 * @param {*} jsonSchemaType
 * @param {*} variableToCast
 */
export function castToCType(jsonSchemaType, variableToCast) {
  switch (jsonSchemaType.toLowerCase()) {
  case 'string':
    return `$"{${variableToCast}}"`;
  case 'integer':
    return `int.Parse(${variableToCast})`;
  case 'number':
    return `decimal.Parse(${variableToCast}, System.Globalization.CultureInfo.InvariantCulture)`;
  case 'boolean':
    return `bool.Parse(${variableToCast})`;
  default: throw new Error(`Parameter type not supported - ${  jsonSchemaType}`);
  }
}

/**
 * Convert RFC 6570 URI with parameters to NATS topic.
 */
export function realizeChannelName(parameters, channelName) {
  let returnString = `"${channelName}"`;
  returnString = returnString.replace(/\//g, '.');
  if (parameters) {
    for (const [paramName,] of parameters) {
      returnString = returnString.replace(`\${${paramName}}`, `{${paramName}}`);
    }
  }
  return returnString;
}
export function realizeChannelNameWithoutParameters(channelName) {
  return realizeChannelName(undefined, channelName);
};

/**
 * Realize parameters without using types without trailing comma
 */
export function realizeParametersForChannelWithoutType(parameters) {
  let returnString = '';
  for (const [paramName,] of parameters) {
    returnString += `${paramName},`;
  }
  if (returnString.length >= 1) {
    returnString = returnString.slice(0, -1);
  }
  return returnString;
};

/**
 * Realize parameters using types without trailing comma
 */
export function realizeParametersForChannel(parameters, required = true) {
  let returnString = '';
  const requiredType = !required ? '?' : '';
  for (const [paramName, parameter] of parameters) {
    returnString += `${toCType(
      parameter.schema().type()
    )}${requiredType} ${paramName},`;
  }
  if (returnString.length >= 1) {
    returnString = returnString.slice(0, -1);
  }
  return returnString;
}
