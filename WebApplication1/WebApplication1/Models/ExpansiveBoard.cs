namespace WebApplication1.Models
{
    public class ExpansiveBoard
    {
        public int Id { get; set; }
        public int MicroControlId { get; set; }// FK quan hệ 1-n
        public string Name { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }// null soft delete
    }
}
