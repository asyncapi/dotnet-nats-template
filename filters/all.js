const filter = module.exports;
const _ = require('lodash');


filter.messageHasNotNullPayload = (messagePayload) => {
	return messagePayload.type()+"" != "null";
}

/**
 * Because quicktype cant handle null types we have to ensure if it is null thats 
 */
filter.getMessageType = (message) => {
	if(message == undefined){
		return "UNDEFINED"
	}else{
		return `${this.pascalCase(message.uid())}`;
	}
}

function camelCase(string) {
	return _.camelCase(string);
}
function pascalCase(string) {
	string = _.camelCase(string);
	return string.charAt(0).toUpperCase() + string.slice(1);
}

filter.firstUpperCase = string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
filter.pascalCase = string => {
	return pascalCase(string);
}
filter.kebabCase = string => {
	return _.kebabCase(string);
}

filter.camelCase = string => {
	return camelCase(string);
}

/**
 * Convert JSON schema draft 7 types to typescript types 
 * @param {*} jsonSchemaType 
 * @param {*} property 
 */
function toCType(jsonSchemaType, property) {
	switch (jsonSchemaType.toLowerCase()) {
		case 'string':
			return 'String';
		case 'integer':
			return 'int'
		case 'number':
			return 'Number';
		case 'boolean':
			return 'bool';
		case 'object':
			if(property){
				return property.uid() + 'Schema';
			}else{
				return 'object';
			}
		default: return 'object';
	}
}

filter.toCType = toCType;

/**
 * Convert RFC 6570 URI with parameters to NATS topic. 
 */
function realizeChannelName(parameters, channelName){
	let returnString = '"' + channelName + '"';
	returnString = returnString.replace(/\//g, `.`);
	for (paramName in parameters) {
		returnString = returnString.replace(`\${${paramName}}`, `{${paramName}}`);
	}
	return returnString;
}

filter.realizeChannelName = realizeChannelName;

filter.realizeChannelNameWithoutParameters = (channelName) => {
	return realizeChannelName(null, channelName);
}

/**
 * Realize parameters without using types without trailing comma
 */
filter.realizeParametersForChannelWithoutType = (parameters) => {
	let returnString = '';
	for (paramName in parameters) {
		returnString += `${paramName},`;
	}
	if (returnString.length >= 1) {
		returnString = returnString.slice(0, -1);
	}
	return returnString;
}

/**
 * Realize parameters using types without trailing comma
 */
filter.realizeParametersForChannel = (parameters, required = true) => {
	let returnString = '';
	const requiredType = !required ? '?' : ''
	for (paramName in parameters) {
		returnString += `${toCType(
			parameters[paramName].schema().type()
		)}${requiredType} ${paramName},`;
	}
	if (returnString.length >= 1) {
		returnString = returnString.slice(0, -1);
	}
	return returnString;
}

/**
 * Does an object have bindings
 */
filter.hasNatsBindings = obj => {
	return obj.bindings() && obj.bindings().nats();
}

/**
 * is the channel a publish and subscribe type if nothing is specified default to being pubsub type 
 */
filter.isPubsub = channel => {
	const tempChannel = channel._json;
	if (
		!tempChannel.bindings || 
		!tempChannel.bindings.nats ||
		!tempChannel.bindings.nats.is || 
		tempChannel.bindings.nats.is == 'pubsub') {
		return true;
	}
	return false;
}

/**
 * is the channel a request and reply
 */
function isRequestReply(channel){
	let tempChannel = channel._json;
	if (
		tempChannel.bindings &&
		tempChannel.bindings.nats &&
		tempChannel.bindings.nats.is == 'requestReply'
	) {
		return true;
	}
	return false;
}
filter.isRequestReply = isRequestReply;

/**
 * Is the request reply a requester
 */
filter.isRequester = channel => {
	let tempChannel = channel._json;
	if (
		isRequestReply(channel) &&
		tempChannel.bindings.nats.requestReply &&
		tempChannel.bindings.nats.requestReply.is == 'requester'
	) {
		return true;
	}
	return false;
}

/**
 * Is the request reply a replier
 */
filter.isReplier = channel => {
	let tempChannel = channel._json;
	if (
		isRequestReply(channel) &&
		tempChannel.bindings.nats.requestReply &&
		tempChannel.bindings.nats.requestReply.is == 'replier'
	) {
		return true;
	}
	return false;
}
