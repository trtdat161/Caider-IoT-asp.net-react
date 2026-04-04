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
     ==============================> (HttpContext) là đối tượng đại diện cho toàn bộ HTTP request/response <=========================
     */
    public static class Login
    {
        public static void LoginApi(this WebApplication app)
        {
            app.MapPost("/api/auth/login", async (DataContext db, [FromBody] User request, JwtTokenService jwt, JwtOption jwtOptions, HttpContext httpContext)
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
                 check username và password(BCRYPT)
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

                var token = jwt.GenerateToken();
                var isDev = app.Environment.IsDevelopment();
                // dùng cookie để lưu token
                httpContext.Response.Cookies.Append("access_token", token, new CookieOptions
                {
                    HttpOnly = true,// Trình duyệt cấm JavaScript đọc cookie này, Nếu false Hacker nhúng script lạ vào, chạy document.cookie là lấy được token
                    Secure = !isDev, // false khi dev vì localhost http, true khi deploy production
                    SameSite = SameSiteMode.Lax,// lax do FE và BE cùng domain
                    Expires = DateTimeOffset.UtcNow.AddMinutes(jwtOptions.DurationInMinutes),
                    Path = "/"
                });

                // cookie 2 chỉ chứa "true", JS đọc được để ProtectedRoute check
                httpContext.Response.Cookies.Append("is_logged_in", "true", new CookieOptions
                {
                    HttpOnly = false, // JS đọc được cookie này để check login
                    Secure = !isDev,
                    SameSite = SameSiteMode.Lax,
                    Expires = DateTimeOffset.UtcNow.AddMinutes(jwtOptions.DurationInMinutes),
                    Path = "/"
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
                httpContext.Response.Cookies.Delete("is_logged_in");// 
                // logout xóa cookie vì token đag gửi kèm trong nó, tức trình duyệt bây h ko lưu cookie này nữa
                return Results.Ok(new
                {
                    message = "logout success"
                });
            }).RequireAuthorization();
        }
    }
}
