using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CaiderBackend.Authentication;

namespace CaiderProject.Authen
{
    // ***************************-> Cấu hình Authentication Middleware
    public static class JwtServiceExtensions
    {
        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            // 1. tạo 1 form jwtOption rỗng với 4 thuộc tính: Key, Issuer, Audience, DurationInMinutes
            var jwtOptions = new JwtOption();
            /*
             2.
            - configuration` => Là đối tượng đang cầm file `appsettings.json` trong tay
            - GetSection("Jwt")` => Lấy phần có tên "Jwt" trong file appsettings.json
            - Bind(jwtOptions)` => Đổ dữ liệu từ file vào cái form `jwtOptions`
             */
            configuration.GetSection("Jwt").Bind(jwtOptions);

            services.AddSingleton(jwtOptions);
            /* AddSingleton để đăng ký jwtOptions vào DI container(tạm hiểu là "kho chứa đồ dùng chung"),
             * giúp các phần khác có thể lấy thông tin cấu hình JWT từ file appsettings.json thông qua DI container */
            
            /* --------- đăng ký services --------- */
            services.AddScoped<JwtTokenService>();

            // chuyển chuỗi khóa bí mật thành mảng byte để dùng tạo và xác thực token JWT ( vì thuật toán mã hóa HMAC-SHA256 hiểu byte, ko hiểu chữ)
            var key = Encoding.UTF8.GetBytes(jwtOptions.Key);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)// AddAuthentication app có dùng xác thực
                .AddJwtBearer(options =>
                /*  Kiểu xác thực JWT Bearer (bearer token là token được gửi trong header Authorization của HTTP request,
                 *  "Bearer" = Người mang token, ai mang token hợp lệ thì được vào) */
                {
                    // ------------- đọc token từ cookie do đang cấu hình jwt lưu token vào cookie ------------
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            context.Token = context.Request.Cookies["access_token"];
                            return Task.CompletedTask;
                        }
                    };

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true, // xác thực token phải do nhà phát hành hợp lệ không, nếu ko có thì token app nào cũng hợp lệ
                        ValidateAudience = true, // Kiểm tra token dùng cho app nào, nếu ko có thì Token của client A dùng được cho client B
                        ValidateLifetime = true, // Kiểm tra token còn hạn không, nếu ko có thì Token hết hạn vẫn dùng được mãi mãi
                        ValidateIssuerSigningKey = true, // Kiểm tra chữ ký có hợp lệ không, nếu ko có thi Token giả mạo lọt vào

                        ValidIssuer = jwtOptions.Issuer, 
                        ValidAudience = jwtOptions.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(key),

                        ClockSkew = TimeSpan.Zero // Mặc định .NET cho phép lệch 5 phút, nếu ko có token hết hạn vẫn dùng thêm 5 phút
                        // trên là cấu hình khi nhận token từ client, sẽ làm gì...
                    };
                });

            services.AddAuthorization();

            return services;
        }
    }
}
