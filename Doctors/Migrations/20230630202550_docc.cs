using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Doctors.Migrations
{
    /// <inheritdoc />
    public partial class docc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "doctor",
                columns: table => new
                {
                    Doctor_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Doctor_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DOB = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Specialization = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Doctor_Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Doctor_Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Doctor_Mobile = table.Column<long>(type: "bigint", nullable: false),
                    Emergency_No = table.Column<long>(type: "bigint", nullable: false),
                    Doctor_Experience = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Constulting_Day = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Constulting_Time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HashedPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Review = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastLogin = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_doctor", x => x.Doctor_ID);
                });

            migrationBuilder.CreateTable(
                name: "Patient",
                columns: table => new
                {
                    Patient_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Patient_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BloodGroup = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Patient_Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Patient_Phone = table.Column<long>(type: "bigint", nullable: false),
                    Patient_Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Patient_UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Patient_HashedPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Doctor_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patient", x => x.Patient_ID);
                    table.ForeignKey(
                        name: "FK_Patient_doctor_Doctor_ID",
                        column: x => x.Doctor_ID,
                        principalTable: "doctor",
                        principalColumn: "Doctor_ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Patient_Doctor_ID",
                table: "Patient",
                column: "Doctor_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Patient");

            migrationBuilder.DropTable(
                name: "doctor");
        }
    }
}
