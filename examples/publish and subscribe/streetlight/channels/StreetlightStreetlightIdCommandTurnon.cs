using NATS.Client;
using System;
using System.Text;
using System.Text.Json;
using Asyncapi.Nats.Client.Models;

namespace Asyncapi.Nats.Client.Channels
{
  class StreetlightStreetlightIdCommandTurnon
  {


internal static byte[] JsonSerializerSupport(LoggingInterface logger, AnonymousSchema_1 obj)
{
  var json = JsonSerializer.Serialize(obj);
  logger.Debug("Serialized message " + json);
  return Encoding.UTF8.GetBytes(json);
}

public static void Publish(
  LoggingInterface logger,
IEncodedConnection connection,
AnonymousSchema_1 requestMessage,
String streetlight_id
){
  logger.Debug("Publishing to channel: " + $"streetlight.{streetlight_id}.command.turnon");
  var serializedObject = JsonSerializerSupport(logger, requestMessage); 
  connection.Publish("streetlight.{streetlight_id}.command.turnon", serializedObject);
}
  }
}