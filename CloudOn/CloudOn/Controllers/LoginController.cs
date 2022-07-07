using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudOn.Models;
using CloudOn.RequestModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CloudOn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public static int uid;
        public static string username;
        private IConfiguration _config;
        private readonly cloudOnContext _cgcontext;

        public LoginController(IConfiguration config, cloudOnContext cg)
        {
            _config = config;
            _cgcontext = cg;
        }
        [Microsoft.AspNetCore.Authorization.AllowAnonymous]
        [HttpPost]
        public IActionResult CreateToken([FromBody]LoginModel login)
        {
            IActionResult response = Unauthorized();
            var user = Authenticate(login);

            if (user != null)
            {
                var tokenString = BuildToken (user);
                response = Ok(new { token = tokenString,id=uid ,name=username});
            }

            return response;
        }
        private string BuildToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private User Authenticate(LoginModel login)
        {
            User user = null;
            var result = _cgcontext.Users.FirstOrDefault(obj => obj.Username == login.username);
            

            try
            {
                if (result.Username != null && result.Password == login.password)
                {
                    user = new User { Username = result.Username, Password = result.Password };
                    uid = result.Id;
                    username = result.Username;
                }
            }
            catch (Exception e)
            {
                return null;
            }

            return user;
        }
        public class LoginModel
        {
            public string username { get; set; }
            public string password { get; set; }
        }

    }
}
