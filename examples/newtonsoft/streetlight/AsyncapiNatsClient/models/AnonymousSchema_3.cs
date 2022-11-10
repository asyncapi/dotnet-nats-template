namespace Asyncapi.Nats.Client.Models
{
  using Newtonsoft.Json;
  using Newtonsoft.Json.Linq;
  using System.Collections.Generic;

  [JsonConverter(typeof(AnonymousSchema_3Converter))]
  public class AnonymousSchema_3
  {
    private int lumen;

    public int Lumen 
    {
      get { return lumen; }
      set { lumen = value; }
    }
  }

  public class AnonymousSchema_3Converter : JsonConverter<AnonymousSchema_3>
  {
    public override AnonymousSchema_3 ReadJson(JsonReader reader, Type objectType, AnonymousSchema_3 existingValue, bool hasExistingValue, JsonSerializer serializer)
  {
    JObject jo = JObject.Load(reader);
    AnonymousSchema_3 value = new AnonymousSchema_3();

    if(jo["lumen" != null) {
    value.Lumen = jo["lumen"].ToObject<int>(serializer);
  }

  
    return value;
  }
    public override void WriteJson(JsonWriter writer, AnonymousSchema_3 value, JsonSerializer serializer)
  {
    JObject jo = new JObject();

    if (value.lumen != null)
  {
    jo.Add("lumen", JToken.FromObject(value.Lumen, serializer));
  }
  

    jo.WriteTo(writer);
  }

    public override bool CanRead => true;
    public override bool CanWrite => true;
  }
}