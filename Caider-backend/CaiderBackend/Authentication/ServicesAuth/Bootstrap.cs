using CaiderBackend.data;
using Microsoft.EntityFrameworkCore;

namespace CaiderBackend.Authentication.ServicesAuth
{
    public static class Bootstrap
    {
        public static void BootstrapApi(this WebApplication app)
        {
            app.MapGet("/api/auth/bootstrap", async (DataContext db) =>
            {
                var adminCheck = await db.Users.SingleOrDefaultAsync();
                if (adminCheck != null)
                {
                    return Results.Json(new
                    {
                        status = false,
                    });
                }
                return Results.Json(new
                {
                    status = true
                });
            }).AllowAnonymous();
        }
    }
}
