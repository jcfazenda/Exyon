using Api.Domain.Repository.Interface;
using Api.Domain.ViewsModel.Input;
using Api.Domain.ViewsModel.Output;
using Api.Generics;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Api.Controllers.Users
{
    [EnableCors("AllowSpecificOrigin")]
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        private readonly IUsersRepository _user;

        public UserController(IUsersRepository user)
        {
            _user = user;
        }

        [HttpPost("Get")]
        [EnableCors("AllowSpecificOrigin")]
        public IActionResult Get([FromBody] UsersInput input)
        {
            if (input == null) { return Response(false, "error", null); } 

            var result = _user.Get(input).ProjectTo<UsersOutput>().FirstOrDefault();

            if (result == null) { return Response(false, "usuario nao localizado.", result); }

            return Response(true, "sucess", result);
        }

        [HttpPost("Connect")]
        [EnableCors("AllowSpecificOrigin")]
        public IActionResult Connect([FromBody] UsersInput input)
        {
            if (input == null) { return Response(false, "error", null); }

            if (input.Email != null)
                if (input.Email.Length > 0)
                    if (!Genericos.IsEmail(input.Email)) { return Response(false, "E-mail esta invalido", null); }

            var result = _user.Connect(input).ProjectTo<UsersOutput>().FirstOrDefault();

            if (result == null) { return Response(false, "usuario nao localizado.", result); }

            return Response(true, "sucess", result);
        }
 
        protected new IActionResult Response(bool Success, string Messsage, object result = null)
        {
            return Ok(new
            {
                Success,
                Messsage,
                data = result
            });
        }


    }
}
