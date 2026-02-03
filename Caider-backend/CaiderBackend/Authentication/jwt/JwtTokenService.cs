using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CaiderBackend.Authentication;

namespace CaiderProject.Authen
{
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
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_options.Key)
            );
            // Dùng con dấu để ký token
            var creds = new SigningCredentials(
                key,// sử dụng key ở trên vừa tạo
                SecurityAlgorithms.HmacSha256 // đóng dấu, thuật toán hsmsha256 
            );

            var token = new JwtSecurityToken(
                issuer: _options.Issuer,// để biết issuer là ai
                audience: _options.Audience,// để sau token này chỉ dùng cho app web của mình ko đc dùng web khác, Tránh hacker lấy token của app này dùng cho app khác
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_options.DurationInMinutes),// JWT chuẩn dùng UTC
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
