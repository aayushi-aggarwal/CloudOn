using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudOn.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CloudOn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class trashController : ControllerBase
    {
        private readonly cloudOnContext _trash;
        public trashController(cloudOnContext Trash)
        {
            _trash = Trash;
        }

        public object CloudOnContext { get; private set; }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var result = _trash.Documents.Where(obj => obj.FolderId == id && obj.IsDeleted == true);
            return Ok(result);

        }

        [HttpGet("folder/{id}")]
        public IActionResult get(int id)
        {

            var result = _trash.Folders.Where(obj => obj.CreatedBy == id && obj.IsDeleted == true);

            return Ok(result);

        }
        [HttpDelete("hd /{id}")]
        public void Delete(int id)
        {
            var del = _trash.Documents.Where(res => res.DocId == id).ToList();
            del.ForEach(res => _trash.Documents.Remove(res));
            _trash.SaveChanges();

        }

    }
}
