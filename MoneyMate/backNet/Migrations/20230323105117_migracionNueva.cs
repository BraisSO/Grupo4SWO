using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backNet.Migrations
{
    /// <inheritdoc />
    public partial class migracionNueva : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Expend",
                table: "Expends",
                newName: "Amount");

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "Expends",
                newName: "Date");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Expends",
                newName: "Comment");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Expends",
                newName: "Expend");
        }
    }
}
