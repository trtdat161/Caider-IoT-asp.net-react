using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CaiderBackend.Authentication;

namespace CaiderProject.Authen
{
    // **************************> đây là nơi cấu hình sinh ra token
    public class JwtTokenService
    {
        private readonly JwtOption _options;

        public JwtTokenService(JwtOption options)
        {
            _options = options;
        }

        public string GenerateToken()
        {
            var claims = new[]
            {
                /*
                Claims: Thông tin về user được nhúng vào token
                Dùng để xác thực và phân quyền sau này
                */
                new Claim(ClaimTypes.Name, "admin"),
                new Claim(ClaimTypes.Role, "Admin")
            };

            // Tạo "con dấu" (secret key)
            var key = new SymmetricSecurityKey(// Bọc mảng byte đó vào 1 đối tượng mà thư viện JWT hiểu được
                Encoding.UTF8.GetBytes(_options.Key) // chuyển key chữ thành byte, do thuật toán mã hóa HMAC-SHA256 hiểu byte, ko hiểu chuôi
            );
            // Dùng con dấu để ký token
            var creds = new SigningCredentials(
                key,// sử dụng key ở trên vừa tạo
                SecurityAlgorithms.HmacSha256 // đóng dấu, thuật toán hsmsha256 
            );

            /*
             phải ký để: chống giả mạo, Nếu hacker sửa claims trong token => chữ ký sai => server từ chối.
             */
            // lắp ráp token...
            var token = new JwtSecurityToken(
                issuer: _options.Issuer,// để biết issuer là ai (do ai phát hành)
                audience: _options.Audience,// để sau token này chỉ dùng cho app web của mình ko đc dùng web khác, Tránh hacker lấy token của app này dùng cho app khác
                claims: claims, // ghi vào token: "Đây là admin, có role Admin"
                expires: DateTime.UtcNow.AddMinutes(_options.DurationInMinutes),// JWT chuẩn dùng UTC
                signingCredentials: creds //  Ký token bằng chữ ký
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
            /*
             + new JwtSecurityTokenHandler() => Tạo đối tượng xử lý JWT
             + .WriteToken(token)` => Gọi hàm `WriteToken` của đối tượng đó, truyền token vào
             +  Kết quả: Chuyển token từ object C# => chuỗi string `"eyJhbGci..."`
             +  Nếu không có dòng này thì token vẫn được tạo nhưng dưới dạng object C#, không thể trả về cho client qua HTTP.
             */
        }
    }
}
