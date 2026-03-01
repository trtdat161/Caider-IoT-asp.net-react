using CaiderBackend.data;
using CaiderBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CaiderBackend.Authentication.form
{
    public static class Register
    {
        public static void RegisterApi(this WebApplication app)
        {
            app.MapPost("/api/auth/register", async(DataContext db, [FromBody] User request) // dùng [Frombody] để lấy dữ liệu từ body của request phía client 
            =>
            {
                bool adminExists = await db.Users.AnyAsync();// Any kiểm tra đã có admin chưa
                if (adminExists)
                {
                    return Results.Conflict(new {
                        code = "ADMIN_EXISTS",
                        message = "đã có admin trong hệ thống !"
                    });
                }
                // ------------ validate ------------
                if (string.IsNullOrEmpty(request.Username))
                {
                    return Results.BadRequest(new
                    {
                        code = "USERNAME_REQUIRED",
                        message = "vui lòng nhập tên đăng nhập"
                    });
                }
                if(string.IsNullOrEmpty(request.Password))
                {
                    return Results.BadRequest(new
                    {
                        code = "PASSWORD_REQUIRED",
                        message = "vui lòng nhập mật khẩu"
                    });
                }
                if(request.Password.Length < 3)
                {
                    return Results.BadRequest(new
                    {
                        code = "PASSWORD_TOO_SHORT",
                        message = "mật khẩu phải ít nhất 3 ký tự"
                    });
                }
                var passwordPattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{3,}$";

                if (!System.Text.RegularExpressions.Regex.IsMatch(request.Password, passwordPattern))
                {
                    return Results.BadRequest(new
                    {
                        code = "PASSWORD_WEAK",
                        message = "mật khẩu phải có chữ hoa, chữ thường và số"
                    });
                }
                if (string.IsNullOrEmpty(request.Email))
                {
                    return Results.BadRequest(new
                    {
                        code = "EMAIL_REQUIRED",
                        message = "vui lòng nhập email"
                    });
                }
                var emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";

                if (!System.Text.RegularExpressions.Regex.IsMatch(request.Email, emailPattern))
                {
                    return Results.BadRequest(new
                    {
                        code = "EMAIL_REQUIRED",
                        message = "vui lòng nhập email"
                    });
                }

                /* ============ tạo admin ============ */
                User adminActive = new User
                {
                    Username = request.Username,
                    Password = BCrypt.Net.BCrypt.HashPassword(request.Password), // mã hóa password
                    Email = request.Email,
                    CreatedAt = DateTime.UtcNow
                };
                db.Users.Add(adminActive);
                await db.SaveChangesAsync();

                /* ============= api register thành công =========== */
                return Results.Created("/api/auth/register", new // tạo mới 201 ok
                {
                    code = "REGISTER_SUCCESS",
                    message = "tạo admin thành công"
                });

            }).AllowAnonymous();// AllowAnonymous đúng vì chưa có admin sao có token
        }
    }
}
