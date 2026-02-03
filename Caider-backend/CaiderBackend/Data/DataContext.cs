using Microsoft.EntityFrameworkCore;
using CaiderBackend.Models;

namespace CaiderBackend.data
{
    public class DataContext : DbContext
    // DbContext connect db, quản lý ..., Theo dõi trạng thái object (Added / Modified / Deleted)
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }// cấu hình cho DbContext...

        /* DbSet là đại diện cho 1 bảng nào đó trên db */
        public DbSet<MicroControl> MicroControls => Set<MicroControl>();
        public DbSet<ExpansiveBoard> ExpansiveBoards => Set<ExpansiveBoard>();
        public DbSet<Servo> Servos => Set<Servo>();
        public DbSet<Motor> Motors => Set<Motor>();
        public DbSet<User> Users => Set<User>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)// ModelBuilder là cái để cấu hình mapping
        /* override lại, map với db, PK, FK, quan hệ... */
        {
            /* ---------- map lại tên created_at do code models là CreatedAt... --------- */
            base.OnModelCreating(modelBuilder);

            // User login
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");
                entity.Property(x => x.CreatedAt).HasColumnName("created_at");
            });

            // MicroControl
            modelBuilder.Entity<MicroControl>(entity =>
            {
                entity.ToTable("microcontroller");
                entity.Property(x => x.CreatedAt).HasColumnName("created_at");
                entity.Property(x => x.UpdatedAt).HasColumnName("updated_at");
                entity.Property(x => x.DeletedAt).HasColumnName("deleted_at");
            });

            // ExpansiveBoard
            modelBuilder.Entity<ExpansiveBoard>(entity =>
            {
                entity.ToTable("expansionboard");
                entity.Property(x => x.MicroControlId).HasColumnName("micro_id");
                // ------- nếu có quan hệ khóa ngoại thì phải mapping lại mới chạy đc -------
                entity.Property(x => x.CreatedAt).HasColumnName("created_at");
                entity.Property(x => x.UpdatedAt).HasColumnName("updated_at");
                entity.Property(x => x.DeletedAt).HasColumnName("deleted_at");
            });

            // Servo
            modelBuilder.Entity<Servo>(entity =>
            {
                entity.ToTable("servo");
                entity.Property(x => x.CreatedAt).HasColumnName("created_at");
                entity.Property(x => x.UpdatedAt).HasColumnName("updated_at");
                entity.Property(x => x.DeletedAt).HasColumnName("deleted_at");
            });

            // Motor
            modelBuilder.Entity<Motor>(entity =>
            {
                entity.ToTable("motor");
                entity.Property(x => x.CreatedAt).HasColumnName("created_at");
                entity.Property(x => x.UpdatedAt).HasColumnName("updated_at");
                entity.Property(x => x.DeletedAt).HasColumnName("deleted_at");
            });
        }
    }
}
