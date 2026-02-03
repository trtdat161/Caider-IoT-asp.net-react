namespace CaiderBackend.Models
{
    public class Servo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}
