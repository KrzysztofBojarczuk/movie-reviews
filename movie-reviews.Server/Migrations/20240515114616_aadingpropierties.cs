using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace movie_reviews.Server.Migrations
{
    /// <inheritdoc />
    public partial class aadingpropierties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfReviews",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfReviews",
                table: "AspNetUsers");
        }
    }
}
