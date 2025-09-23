namespace InsuranceAPI.Models.DTOs
{
    public class PremiumCalculationRequest
    {
        public string ProductType { get; set; } = string.Empty;
        public decimal CoverageAmount { get; set; }
        public decimal Excess { get; set; }
        public DateTime DateOfBirth { get; set; }
        
        // Future: could include more factors
        // public string State { get; set; }
        // public bool HasPriorClaims { get; set; }
        // public int CreditScore { get; set; }
    }
    
    public class PremiumCalculationResponse 
    {
        public decimal Premium { get; set; }
    }
}