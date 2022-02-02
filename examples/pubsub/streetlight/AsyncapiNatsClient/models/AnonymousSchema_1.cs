namespace Asyncapi.Nats.Client.Models
{
  using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
  [JsonConverter(typeof(AnonymousSchema_1Converter))]
public class AnonymousSchema_1 {
  private int? lumen;

  public int? Lumen 
  {
    get { return lumen; }
    set { lumen = value; }
  }
}

internal class AnonymousSchema_1Converter : JsonConverter<AnonymousSchema_1>
{
  public override bool CanConvert(System.Type objectType)
  {
    // this converter can be applied to any type
    return true;
  }
  public override AnonymousSchema_1 Read(ref Utf8JsonReader reader, System.Type typeToConvert, JsonSerializerOptions options)
  {
    if (reader.TokenType != JsonTokenType.StartObject)
    {
      throw new JsonException();
    }

    var instance = new AnonymousSchema_1();
  
    while (reader.Read())
    {
      if (reader.TokenType == JsonTokenType.EndObject)
      {
        return instance;
      }

      // Get the key.
      if (reader.TokenType != JsonTokenType.PropertyName)
      {
        throw new JsonException();
      }

      string propertyName = reader.GetString();
      if (propertyName == "lumen")
      {
        var value = JsonSerializer.Deserialize<int?>(ref reader, options);
        instance.Lumen = value;
        continue;
      }

    

    
    }
  
    throw new JsonException();
  }
  public override void Write(Utf8JsonWriter writer, AnonymousSchema_1 value, JsonSerializerOptions options)
  {
    if (value == null)
    {
      JsonSerializer.Serialize(writer, null);
      return;
    }
    var properties = value.GetType().GetProperties();
  
    writer.WriteStartObject();

    if(value.Lumen != null) { 
      // write property name and let the serializer serialize the value itself
      writer.WritePropertyName("lumen");
      JsonSerializer.Serialize(writer, value.Lumen);
    }


  

  

    writer.WriteEndObject();
  }

}

}