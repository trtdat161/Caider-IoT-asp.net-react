using CaiderBackend.data;
using CaiderBackend.Models;
using CaiderProject.Authen;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace CaiderBackend.Authentication.form
{
    public static class Login
    {
        public static void LoginApi(this WebApplication app)
        {
            app.MapPost("/api/auth/login", async (DataContext db, string username, string password, JwtTokenService jwt)
                =>
            {
                // check xem có thằng admin chưa
                var admin = await db.Users.FirstOrDefaultAsync(); // mình thằng admin 

                if(admin == null)
                {
                    return Results.Conflict(new
                    {// Conflict 409 xung đột trạng thái nghiệp vụ (LÚC NÀY CHƯA ADMIN)
                        code = "ADMIN_NOT_INITIALIZED",
                        Message = "Chưa có tài khoản admin !"
                    });
                }

                /*
                 check username và password(BRYPT)
                 báo lỗi chung chung để gọi là đúng nghiệp vụ, ko báo rõ username hay password
                 */
                if (admin.Username != username)
                {
                    return Results.Json(new
                    {
                        code = "INVALID_CREDENTIALS",
                        message = "Sai tài khoản hoặc mật khẩu"
                    },
                    statusCode: StatusCodes.Status401Unauthorized  // 401
                    );
                }

                var isPasswordValid = BCrypt.Net.BCrypt.Verify(password, admin.Password);// true false
                if (!isPasswordValid)
                {
                    return Results.Json(new
                    {
                        code = "INVALID_CREDENTIALS",
                        message = "Sai tài khoản hoặc mật khẩu"
                    },
                    statusCode: StatusCodes.Status401Unauthorized  // 401
                    );
                }
                // ================ trả về token =================
                var token = jwt.GenerateToken();
                return Results.Ok(new // 200
                {
                    access_token = token
                });

            }).AllowAnonymous();// cho phép ko cần auth vẫn gọi đc do login ban đầy lấy đâu ra token
        }
    }
}
