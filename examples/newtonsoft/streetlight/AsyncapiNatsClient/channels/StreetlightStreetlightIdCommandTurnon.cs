using NATS.Client;
using System;
using System.Text;
using Newtonsoft.Json;
using Asyncapi.Nats.Client.Models;

namespace Asyncapi.Nats.Client.Channels
{
  class StreetlightStreetlightIdCommandTurnon
  {

  internal static AnonymousSchema_1 JsonDeserializerSupport(LoggingInterface logger, byte[] buffer)
{
  var srt = Encoding.UTF8.GetString(buffer);
  logger.Debug("Deserializing message " + srt);
  return JsonConvert.DeserializeObject<AnonymousSchema_1>(srt, new AnonymousSchema_1Converter());
}
  public static IAsyncSubscription Subscribe(
    LoggingInterface logger,
IEncodedConnection connection,
StreetlightStreetlightIdCommandTurnonOnRequest onRequest,
String streetlight_id
  )
  {
    EventHandler<EncodedMessageEventArgs> handler = (sender, args) =>
    {
      logger.Debug("Got message for channel subscription: " + $"streetlight.{streetlight_id}.command.turnon");
      var deserializedMessage = JsonDeserializerSupport(logger, (byte[])args.ReceivedObject);

      var unmodifiedChannel = "streetlight.{streetlight_id}.command.turnon";
  var channel = args.Subject;
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