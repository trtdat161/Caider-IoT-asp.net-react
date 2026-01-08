using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<MicroControl> MicroControls => Set<MicroControl>();
        public DbSet<ExpansiveBoard> ExpansiveBoards => Set<ExpansiveBoard>();
        public DbSet<Servo> Servos => Set<Servo>();
        public DbSet<Motor> Motors => Set<Motor>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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
                // nếu có quan hệ khóa ngoại thì phải mapping lại mới chạy đc
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
