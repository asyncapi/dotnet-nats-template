using NATS.Client;
using System;
using System.Text;
using System.Text.Json;
using Asyncapi.Nats.Client.Models;
using NATS.Client.JetStream;

namespace Asyncapi.Nats.Client.Channels
{
  class StreetlightStreetlightIdCommandTurnon
  {
    
  internal static AnonymousSchema_1 JsonDeserializerSupport(LoggingInterface logger, byte[] buffer)
{
  var srt = Encoding.UTF8.GetString(buffer);
  logger.Debug("Deserializing message " + srt);
  return JsonSerializer.Deserialize<AnonymousSchema_1>(srt);
}
  public static IAsyncSubscription Subscribe(
    LoggingInterface logger,
IConnection connection,
StreetlightStreetlightIdCommandTurnonOnRequest onRequest,
String streetlight_id
  )
  {
    EventHandler<MsgHandlerEventArgs> handler = (sender, args) =>
    {
      logger.Debug("Got message for channel subscription: " + $"streetlight.{streetlight_id}.command.turnon");
      var deserializedMessage = JsonDeserializerSupport(logger, (byte[])args.Message.Data);

      var unmodifiedChannel = "streetlight.{streetlight_id}.command.turnon";
  var channel = args.Message.Subject;
  var streetlightIdSplit = unmodifiedChannel.Split(new string[] { "{streetlight_id}" }, StringSplitOptions.None);
  String[] splits = {
    streetlightIdSplit[0],
streetlightIdSplit[1]
  };
  channel = channel.Substring(splits[0].Length);
var streetlightIdEnd = channel.IndexOf(splits[1]);
var streetlightIdParam = $"{channel.Substring(0, streetlightIdEnd)}";
      
      onRequest(deserializedMessage,
streetlightIdParam);
    };
    logger.Debug("Subscribing to: " + $"streetlight.{streetlight_id}.command.turnon");
    return connection.SubscribeAsync($"streetlight.{streetlight_id}.command.turnon",handler);
  }
  }
}