using System;
using Npgsql;

namespace DbConnectivityTest
{
    class Program
    {
        static void Main(string[] args)
        {
            var connectionString = "Host=your-rds-host;Port=5432;Database=DemoAGYDB;Username=your-username;Password=your-password;";
            
            try
            {
                using (var conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    Console.WriteLine("Connected. Listing tables:");
                    
                    using (var cmd = new NpgsqlCommand("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';", conn))
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Console.WriteLine($"- {reader.GetString(0)}");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}
