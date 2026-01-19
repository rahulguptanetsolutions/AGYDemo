namespace CleanArch.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty; // In real app, use salt/hash
        public string Role { get; set; } = "User";
    }
}
