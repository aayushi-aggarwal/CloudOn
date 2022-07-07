using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CloudOn.RequestModel
{
    public class Document
    {
        public string DName { get; set; }
        public string ContentType { get; set; }
        public int? Size { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? FolderId { get; set; }
        public bool? IsDeleted { get; set; }

        public bool? isfavourite { get; set; }
    }
}
