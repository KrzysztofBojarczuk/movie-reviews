using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace movie_reviews.Server.Migrations
{
    /// <inheritdoc />
    public partial class addoingpropertiestoreviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CostOfReview",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfHours",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Rate",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CostOfReview",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "NumberOfHours",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "Rate",
                table: "Reviews");
        }
    }
}
