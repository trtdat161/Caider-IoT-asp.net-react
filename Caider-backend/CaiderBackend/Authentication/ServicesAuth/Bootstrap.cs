using CaiderBackend.data;
using Microsoft.EntityFrameworkCore;

namespace CaiderBackend.Authentication.ServicesAuth
{
    public static class Bootstrap
    {
     /*
     ==============================> (HttpContext) là đối tượng đại diện cho toàn bộ HTTP request/response <=========================
     */
        public static void BootstrapApi(this WebApplication app)
        {
            app.MapGet("/api/auth/bootstrap", async (DataContext db) =>
            {
                var adminCheck = await db.Users.SingleOrDefaultAsync();
                if (adminCheck != null)
                {
                    return Results.Json(new
                    {
                        status = true,
                    });
                }
                return Results.Json(new
                {
                    status = false
                });
            }).AllowAnonymous();
        }

        // tạo method checkAuth để midleware để route guard bên FE gọi
        public static void CheckAuthApi(this WebApplication app)
        {
            app.MapGet("/api/auth/check", (HttpContext httpContext) =>
            {
                return Results.Ok(new 
                {
                    message = "authenticated"
                });
            }).RequireAuthorization();// nếu token hợp lệ trả về 200
        }
    }
}
