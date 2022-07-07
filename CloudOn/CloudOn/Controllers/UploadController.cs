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
    public class UploadController : ControllerBase
    {
      
        private readonly cloudOnContext _U;
        public UploadController(cloudOnContext UPL)
        {
            _U = UPL;
        }
        // GET: api/Upload
        [HttpGet]
        public IActionResult Get2()
        {
            var up = _U.Folders.ToList();
            return Ok(up);
        }


        // GET: api/Upload/5

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _U.Folders.Where(obj => obj.CreatedBy == id && obj.IsDeleted == false);

                if (result == null) return NotFound();

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }


        // POST: api/Upload
        [HttpPost]
        public void Post([FromBody] Upload value)
        {
             Folders obj1 = new Folders();
            obj1.FName = value.FName;
            obj1.CreatedAt = value.CreatedAt;
            obj1.CreatedBy = value.CreatedBy;
            obj1.IsDeleted = value.IsDeleted;
            obj1.isfavourite = value.isfavourite;
            _U.Folders.Add(obj1);
            _U.SaveChanges();
        }


        // PUT: api/Upload/5
        [HttpPut("folder/put/{id}")]
        public void SoftDelete(int id)
        {
            var delete = _U.Folders.First(res => res.Id == id);
            delete.IsDeleted = true;
            _U.Folders.Update(delete);
            _U.SaveChanges();
        }

        //PUT : Api/trash->dashboard

        [HttpPut("restore/put/{id}")]
        public void restore(int id)
        {
            var restore = _U.Folders.First(res => res.Id == id);
            restore.IsDeleted = false;
            _U.Folders.Update(restore);
            _U.SaveChanges();
        }


        [HttpPut("favfol/{id}")]
        public void favFol(int id)
        {
            var fav = _U.Folders.First(res => res.Id == id);
            fav.isfavourite = true;
            _U.Folders.Update(fav);
            _U.SaveChanges();
        }
        [HttpPut("removefavfol/{id}")]
        public void removeFavourites(int id)
        {
            var favFold = _U.Folders.First(res => res.Id == id);
            favFold.isfavourite = false;
            _U.Folders.Update(favFold);
            _U.SaveChanges();
        }



        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
         public void Delete(int id)
         {
            var delete = _U.Documents.Where(o => o.FolderId == id).ToList();
            delete.ForEach(res => _U.Documents.Remove(res));
            var delete1 = _U.Folders.Where(o => o.Id == id).ToList();
            delete1.ForEach(res => _U.Folders.Remove(res));
            _U.SaveChanges();
        }



        [HttpGet("folder/{id}/{value}")]
        public IActionResult Get(int id, string value)
        {
            var result = _U.Folders.Where(obj => (obj.FName.Contains(value) && obj.CreatedBy == id));
            return Ok(result);
        }
        [HttpGet("Recent/{userId}/{time}")]
        public IActionResult showRecent(int userId, int time)
        {
            int m = 0;
            try
            {

                if (time == 6)
                {
                    var createdAt = DateTime.Now.AddHours(-6);

                    var res = _U.Folders.Where(o => o.CreatedAt >= createdAt && o.CreatedBy == userId && o.IsDeleted == false);
                    return Ok(res);
                }
                else if (time == 1)
                {
                    var createdAt = DateTime.Now.AddHours(-1);

                    var res = _U.Folders.Where(o => o.CreatedAt >= createdAt && o.CreatedBy == userId && o.IsDeleted == false);
                    return Ok(res);
                }
                else if (time == 30)
                {
                    var createdAt = DateTime.Now.AddMinutes(-30);

                    var res = _U.Folders.Where(o => o.CreatedAt >= createdAt && o.CreatedBy == userId && o.IsDeleted == false);
                    return Ok(res);
                }
                else if (time == 12)
                {
                    var createdAt = DateTime.Now.AddHours(-12);

                    var res = _U.Folders.Where(o => o.CreatedAt >= createdAt && o.CreatedBy == userId && o.IsDeleted == false);
                    return Ok(res);
                }
                else
                {
                    var createdAt = DateTime.Now.AddHours(-24);

                    var res = _U.Folders.Where(o => o.CreatedAt >= createdAt && o.CreatedBy == userId && o.IsDeleted == false);
                    return Ok(res);
                }

            }
            catch (Exception e)
            {
                m = 404;
                return StatusCode(m);
            }

        }


    }
}
