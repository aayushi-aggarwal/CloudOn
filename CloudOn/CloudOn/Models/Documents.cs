using System;
using System.Collections.Generic;

namespace CloudOn.Models
{
    public partial class Documents
    {
        public int DocId { get; set; }
        public string DName { get; set; }
        public string ContentType { get; set; }
        public int? Size { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? FolderId { get; set; }
        public bool? IsDeleted { get; set; }

        public bool? isfavourite { get; set; }

        public Users CreatedByNavigation { get; set; }
        public Folders Folder { get; set; }
    }
}
