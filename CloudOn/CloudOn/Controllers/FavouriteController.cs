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
    public class FavouriteController : ControllerBase
    {
        private readonly cloudOnContext _fav;
        public FavouriteController(cloudOnContext x)
        {
            _fav = x;
        }


        // GET: api/Favourite
        [HttpGet("favfol/{id:int}")]
        public IActionResult getfav(int id)
        {
            var fav_fol = _fav.Folders.Where(o => o.CreatedBy == id && o.isfavourite == true);
            return Ok(fav_fol);
        }


        [HttpGet("favfile/{id:int}")]
        public IActionResult get2(int id)
        {
            var fav_file = _fav.Documents.Where(o => o.FolderId == id && o.isfavourite == true);
            return Ok(fav_file);
        }

    }


    }

