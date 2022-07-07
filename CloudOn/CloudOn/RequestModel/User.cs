using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CloudOn.RequestModel
{
    public class User
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
