using Azure;
using CaiderBackend.data;
using CaiderBackend.Models;
using CaiderProject.Authen;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace CaiderBackend.Authentication.form
{
    /*
     (HttpContext) là đối tượng đại diện cho toàn bộ HTTP request/response
     */
    public static class Login
    {
        public static void LoginApi(this WebApplication app)
        {
            app.MapPost("/api/auth/login", async (DataContext db, [FromBody] User request, JwtTokenService jwt, HttpContext httpContext)
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
                if (admin.Username != request.Username)
                {
                    return Results.Json(new
                    {
                        code = "INVALID_CREDENTIALS",
                        message = "Sai tài khoản hoặc mật khẩu"
                    },
                    statusCode: StatusCodes.Status401Unauthorized  // 401
                    );
                }

                var isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, admin.Password);// true false
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
                // ================ trả về token(dạng thô json) =================

                //var token = jwt.GenerateToken();
                //return Results.Ok(new // 200
                //{
                //    access_token = token
                //});

                var token = jwt.GenerateToken();
                // dùng cookie để lưu token
                httpContext.Response.Cookies.Append("access_token", token, new CookieOptions
                {
                    HttpOnly = true,// Trình duyệt cấm JavaScript đọc cookie này, Nếu false Hacker nhúng script lạ vào, chạy document.cookie là lấy được token
                    Secure = false, // false khi dev vì localhost http, true khi deploy production
                    SameSite = SameSiteMode.Strict,// Có tác dụng: Chống tấn công **CSRF** (Cross-Site Request Forgery) CSRF : Hacker tạo 1 trang web giả, dụ click vào → trang đó tự gửi request đến BE của mày kèm cookie → BE tưởng là mày gửi
                    Expires = DateTimeOffset.UtcNow.AddMinutes(60) // Cookie **tự xóa** sau 60 phút
                });

                return Results.Ok(new
                {
                    message = "login success"
                });
            }).AllowAnonymous();// cho phép ko cần auth vẫn gọi đc do login ban đầy lấy đâu ra token
        }

        // với method logout chỉ đơn giản là logout ko có LinQ hay gì nên ko xử lý bất đồng bộ
        public static void LogoutApi(this WebApplication app)
        {
            app.MapPost("/api/auth/logout", (HttpContext httpContext) =>
            {
                httpContext.Response.Cookies.Delete("access_token");
                // logout xóa cookie vì token đag gửi kèm trong nó, tức trình duyệt bây h ko lưu cookie này nữa
                return Results.Ok(new
                {
                    message = "logout success"
                });
            }).RequireAuthorization();
        }
    }
}
