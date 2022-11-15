using NATS.Client;
using System;
using System.Text;
using Newtonsoft.Json;
using Asyncapi.Nats.Client.Models;

namespace Asyncapi.Nats.Client.Channels
{
  class StreetlightStreetlightIdEventTurnon
  {


internal static byte[] JsonSerializerSupport(LoggingInterface logger, AnonymousSchema_3 obj)
{
  var json = JsonConvert.SerializeObject(obj);
  logger.Debug("Serialized message " + json);
  return Encoding.UTF8.GetBytes(json);
}

public static void Publish(
  LoggingInterface logger,
IEncodedConnection connection,
AnonymousSchema_3 requestMessage,
String streetlight_id
){
  logger.Debug("Publishing to channel: " + $"streetlight.{streetlight_id}.event.turnon");
  var serializedObject = JsonSerializerSupport(logger, requestMessage); 
  connection.Publish("streetlight.{streetlight_id}.event.turnon", serializedObject);
}
  }
}