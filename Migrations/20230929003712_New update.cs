using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SharpAnglesTemplate.Migrations
{
    /// <inheritdoc />
    public partial class Newupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleEntity_Users_UserId",
                table: "RoleEntity");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "RoleEntity",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RoleEntity_Users_UserId",
                table: "RoleEntity",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleEntity_Users_UserId",
                table: "RoleEntity");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "RoleEntity",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleEntity_Users_UserId",
                table: "RoleEntity",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
