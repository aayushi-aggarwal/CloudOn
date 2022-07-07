using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CloudOn.Models;
using CloudOn.RequestModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace CloudOn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class documentController : ControllerBase
    {
        // GET: api/document
        private readonly cloudOnContext _d;
        private readonly IHostingEnvironment _env;
        private object _environment;
        private object cloudOncontext;

        public documentController(cloudOnContext doc, IHostingEnvironment environment)
        {
            _d = doc;
            _env = environment;
        }
        [HttpGet]
        public IActionResult Get3()
        {
            var D = _d.Documents.ToList();
            return Ok(D);
        }
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _d.Documents.Where(obj => obj.FolderId == id && obj.IsDeleted==false);

                if (result == null) return NotFound();

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }


        // POST: api/document
        [HttpPost]
        public void Post([FromBody] Document value)
        {
            Documents obj1 = new Documents();
            obj1.DName = value.DName;
            obj1.ContentType = value.ContentType;
            obj1.Size = value.Size;
            obj1.FolderId = value.FolderId;
            obj1.CreatedAt = value.CreatedAt;
            obj1.CreatedBy = value.CreatedBy;
            obj1.IsDeleted = value.IsDeleted;
            _d.Documents.Add(obj1);
            _d.SaveChanges();
        }

        // PUT: api/document/5
        [HttpPut("file/{id}")]
        public void SoftDelete(int id)
        {
            var delete = _d.Documents.First(res => res.DocId == id);
            delete.IsDeleted = true;
            
           _d.Documents.Update(delete);
           
             _d.SaveChanges();
        }
        //PUT : api/fav
        [HttpPut("favFile/{id}")]
        public void favFile(int id)
        {
            var fav = _d.Documents.First(res => res.DocId == id);
            fav.isfavourite = true;
            _d.Documents.Update(fav);
            _d.SaveChanges();
        }
        [HttpPut("removefavourite/{id}")]
        public void removeFavourites(int id)
        {
            var favFold = _d.Documents.First(res => res.DocId == id);
            favFold.isfavourite = false;
            _d.Documents.Update(favFold);
            _d.SaveChanges();
        }



        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var delete = _d.Documents.Where(o => o.DocId == id).ToList();
            delete.ForEach(res => _d.Documents.Remove(res));
            _d.SaveChanges();
        }

        [HttpGet("folder/{id}/{value}")]
        public IActionResult Get(int id, string value)
        {
            var result = _d.Documents.Where(obj => (obj.DName.Contains(value) && obj.FolderId == id));
            return Ok(result);
        }
        /*---------------------------------------------------------------------*/


        
[HttpPost]
[Route("upload/{createdBy}/{createdAt}/{folderId}")]
        public IActionResult post(int createdBy, DateTime createdAt, int folderId)
        {
            //long fsize = files.Sum(f => f.Length);
            if (Request.Form.Files.Count() > 0)
           {
                string abc = "aaa";
            }
            IFormFile file = Request.Form.Files[0]; var RootPath = Path.Combine(_env.ContentRootPath, "Resources", "Documents");
            if (!Directory.Exists(RootPath))
                Directory.CreateDirectory(RootPath);
            for (var i = 0; i < Request.Form.Files.Count(); i++)
            {
                var filePath = Path.Combine(RootPath, file.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    Documents obj = new Documents();
                    {
                        obj.DName = file.FileName;
                        obj.ContentType = file.ContentType;
                        obj.Size = (int)file.Length;
                        obj.CreatedBy = createdBy;
                        obj.CreatedAt = createdAt;
                        obj.FolderId = folderId;
                        obj.IsDeleted = false;
                    };
                    file.CopyTo(stream);
                    _d.Documents.Add(obj);
                    _d.SaveChanges();
                }
            }
            //return Ok(new { count = files.Count, fsize });
            return Ok();
        }












    }
}
