export default function standard() {
  return `
	private class DefaultLogger : LoggingInterface
	{
		public void Debug(string m)
		{
		}

		public void Error(string m)
		{
		}

		public void Info(string m)
		{
		}
	}
	private IEncodedConnection connection;
	private LoggingInterface logger;
	public LoggingInterface Logger
	{
		get
		{
			return logger;
		}

		set
		{
			logger = value;
		}
	}	

	public void Connect()
	{
		connection = new ConnectionFactory().CreateConnection();
	}

	public void Connect(string url)
	{
		connection = new ConnectionFactory().CreateConnection(url);
	}
	
	public void Connect(Options opts)
	{
		connection = new ConnectionFactory().CreateConnection(opts);
	}
	public Boolean IsConnected()
	{
		return connection != null && !connection.IsClosed();
	}
	
	public void Close()
	{
		if(connection != null && !connection.IsClosed())
		{
			connection.Close();
		}
	}
`;
}
