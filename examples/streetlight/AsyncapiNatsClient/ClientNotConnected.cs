using System;

namespace Asyncapi.Nats.Client
{
  [Serializable()]
  public class ClientNotConnected : System.Exception
  {
    public ClientNotConnected() : base() { }
    public ClientNotConnected(string message) : base(message) { }
    public ClientNotConnected(string message, System.Exception inner) : base(message, inner) { }

    protected ClientNotConnected(System.Runtime.Serialization.SerializationInfo info,
        System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
  }
}