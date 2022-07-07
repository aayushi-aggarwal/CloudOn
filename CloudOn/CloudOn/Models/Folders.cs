using System;
using System.Collections.Generic;

namespace CloudOn.Models
{
    public partial class Folders
    {
        public Folders()
        {
            Documents = new HashSet<Documents>();
        }

        public int Id { get; set; }
        public string FName { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? isfavourite { get; set; }

        public Users CreatedByNavigation { get; set; }
        public ICollection<Documents> Documents { get; set; }
    }
}
