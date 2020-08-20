using System;
namespace Dotnet.Nats.Client
{
    public interface LoggingInterface
    {
        void Info(String m);
        void Error(String m);
        void Debug(String m);
    }
}
