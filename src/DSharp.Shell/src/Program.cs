﻿namespace DSharp.Shell.src
{
    public class Program
    {
        public static int Main(string[] args)
        {
            string value = "".PadRightC(10, 'F')
                .PadRightC(10, 'F')
                .PadRightC(10, 'F');

            return 0.Increment();
        }
    }
}
