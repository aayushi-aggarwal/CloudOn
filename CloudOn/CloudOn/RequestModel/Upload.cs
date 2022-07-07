using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CloudOn.RequestModel
{
    public class Upload
    {
        public string FName { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? isfavourite { get; set; }
    }
}
