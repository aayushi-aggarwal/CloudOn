using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudOn.Models;
using CloudOn.RequestModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CloudOn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : ControllerBase
    {
        // GET: api/SignUp
        private readonly cloudOnContext _C;
        public SignUpController(cloudOnContext CO)
        {
            _C = CO;
        }
        [HttpGet]
        public IActionResult Get3()
        {
            var user_info = _C.Users.ToList();
            return Ok(user_info);
        }

        // GET: api/SignUp/5
        

        // POST: api/SignUp
        [HttpPost]
        public void Post([FromBody] User value)
        {
            Users obj = new Users();
            obj.Username = value.Username;
            obj.Password = value.Password;
            obj.CreatedAt = value.CreatedAt;
            _C.Users.Add(obj);
            _C.SaveChanges();
        }

        // PUT: api/SignUp/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
