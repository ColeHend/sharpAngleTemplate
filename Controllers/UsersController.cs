using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using sharpAngleTemplate.data;
using sharpAngleTemplate.tools;

namespace sharpAngleTemplate.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly SharpAngleContext dbContext;
        public UsersController(SharpAngleContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("Register")]
        public IActionResult Register()
        {

            return Ok();
        }

        [HttpPost("Login")]
        public IActionResult Login()
        {

            return Ok();
        }

        [HttpPost]
        public IActionResult Get()
        {

            return Ok();
        }

        [HttpPut]
        public IActionResult Update()
        {

            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete()
        {

            return Ok();
        }
    }
}