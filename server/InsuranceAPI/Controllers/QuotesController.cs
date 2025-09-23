using InsuranceAPI.Data;
using InsuranceAPI.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InsuranceAPI.Models.DTOs;
namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuotesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QuotesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/quotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
        {
            return await _context.Quotes.ToListAsync();
        }

        // POST: api/quotes
        [HttpPost]
        public async Task<ActionResult<Quote>> PostQuote(Quote quote)
        {
            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuotes), new { id = quote.Id }, quote);
        }
    [HttpPost("calculate-premium")]
    public ActionResult<decimal> CalculatePremium([FromBody] PremiumCalculationRequest request)
    {
        try
        {
            var premium = CalculatePremiumLogic(request);
            return Ok(new { premium = premium });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = "Unable to calculate premium", details = ex.Message });
        }
    }
    
    private decimal CalculatePremiumLogic(PremiumCalculationRequest request)
    {
        // This would typically involve:
        // - Database lookups for base rates
        // - Risk factor calculations  
        // - Regulatory compliance checks
        // - External API calls (credit scores, claims history, etc.)
        
        var basePremium = request.CoverageAmount * 0.02m;
        
        // excess factor
        var excessMultiplier = request.Excess < 500 ? 1.2m : 0.9m;
        
        // Product type factor  
        var productMultiplier = request.ProductType.ToLower() switch
        {
            "auto" => 1.0m,
            "home" => 0.8m, 
            "life" => 1.5m,
            _ => 1.0m
        };
        
        // Age factor (simplified)
        var age = DateTime.Now.Year - request.DateOfBirth.Year;
        var ageMultiplier = age switch
        {
            < 25 => 1.3m,
            >= 25 and < 65 => 1.0m,
            _ => 1.1m
        };
        
        var finalPremium = basePremium * excessMultiplier * productMultiplier * ageMultiplier;
        
        return Math.Round(finalPremium, 2);
    }

    }

    
}






