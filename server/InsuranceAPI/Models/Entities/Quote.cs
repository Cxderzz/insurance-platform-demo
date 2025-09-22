namespace InsuranceAPI.Models.Entities
{
    public class Quote
    {
        public int Id { get; set; }  // EF Core will treat this as PK
        public string CustomerName { get; set; } = string.Empty;
        public string ProductType { get; set; } = string.Empty;
        public decimal Premium { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}