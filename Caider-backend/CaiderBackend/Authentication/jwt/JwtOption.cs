namespace CaiderBackend.Authentication
{
    public class JwtOption
    {
        public string Key { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public int DurationInMinutes { get; set; }
    }
}
/*
  = string.Empty tức là key hiện tại sẽ có giá trị, nhưng hiện tại sẽ rỗng
tức khi khởi tạo, chưa biết key là gì, nhưng đừng cho nó là null
----------------------------------- 
khi tạo sẽ là : new JwtOptions()
Key	""
Issuer	""
Audience	""
DurationInMinutes	0

-----------------------------------
sau đó: Bind từ appsettings.json
"Jwt": {
  "Key": "abc123",
  "Issuer": "Caider",
  "Audience": "Client",
  "DurationInMinutes": 60
}

.NET sẽ:
Ghi đè "" → "abc123"
Ghi đè 0 → 60

== >>> Lúc này mới là giá trị thật

-----------------------------------
Nếu KHÔNG gán string.Empty thì ...
.NET sẽ nghĩ:

“Property này không được phép null”
Nhưng:
Khi tạo object
Chưa bind config
Giá trị là null

 */