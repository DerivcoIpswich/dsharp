namespace DSharp.Shell.src
{
    public class Program
    {
        public static int Main(string[] args)
        {
            Properties properties = new Properties("Private String")
            {
                Normal = "Set in the property initialiser"
            };

            properties.Normal = "test2";
            var readWrite = properties.ReadLocalWrite;
            var readonlyValue = properties.ReadonlyValue;
        }
    }

    public class Properties
    {
        public string Normal { get; set; }

        public string ReadLocalWrite { get; private set; }

        public string ReadonlyValue { get; }

        public Properties(string readonlyVal)
        {
            ReadonlyValue = readonlyVal;
        }

        public void Change(string value)
        {
            ReadLocalWrite = value;
        }
    }
}
