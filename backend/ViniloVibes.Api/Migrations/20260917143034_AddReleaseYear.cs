using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ViniloVibes.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddReleaseYear : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReleaseYear",
                table: "Vinyls",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReleaseYear",
                table: "Vinyls");
        }
    }
}
