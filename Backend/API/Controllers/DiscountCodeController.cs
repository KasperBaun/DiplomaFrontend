using ClassLibrary.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers

{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountCodeController : ControllerBase
    {
        private readonly GroenlundDbContext _context;

        public DiscountCodeController(GroenlundDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var discountCodes = _context.DiscountCodes.ToList();

            if (discountCodes == null || discountCodes.Count == 0)
            {
                return new NoContentResult();
            }

            return new OkObjectResult(discountCodes);
        }
    }
}
