using MainWebApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace MainWebApplication.Controllers
{
    [Route("auth")]
    public class LRController : Controller
    {
        private readonly ILogger<LRController> _logger;

        public LRController(ILogger<LRController> logger)
        {
            _logger = logger;
        }

        [HttpGet("login")]
        public IActionResult Login()
        {
            return View();
        }
        [HttpGet("register")]
        public IActionResult Register()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        [HttpGet("test")]
        [Authorize(Roles = "user")]
        public IActionResult Test()
        {
            return new JsonResult(new { success = true });
        }
    }
}
