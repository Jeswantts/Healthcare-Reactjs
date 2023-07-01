using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Appointments.Migrations
{
    /// <inheritdoc />
    public partial class appointment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Doctor",
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
                    table.PrimaryKey("PK_Doctor", x => x.Doctor_ID);
                });

            migrationBuilder.CreateTable(
                name: "Patient",
                columns: table => new
                {
                    Patient_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "100, 1"),
                    Patient_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BloodGroup = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Patient_Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Patient_Phone = table.Column<long>(type: "bigint", nullable: false),
                    Patient_Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Patient_UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Patient_HashedPassword = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patient", x => x.Patient_ID);
                    
                });

            migrationBuilder.CreateTable(
                name: "Appoinment",
                columns: table => new
                {
                    Appoinment_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "10000, 1"),
                    Patient_ID = table.Column<int>(type: "int", nullable: false),
                    Doctor_ID = table.Column<int>(type: "int", nullable: false),
                    Reason_of_visit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Patient_Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Diagnosis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Treatment = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appoinment", x => x.Appoinment_ID);
                    table.ForeignKey(
                        name: "FK_Appoinment_Doctor_Doctor_ID",
                        column: x => x.Doctor_ID,
                        principalTable: "Doctor",
                        principalColumn: "Doctor_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Appoinment_Patient_Patient_ID",
                        column: x => x.Patient_ID,
                        principalTable: "Patient",
                        principalColumn: "Patient_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appoinment_Doctor_ID",
                table: "Appoinment",
                column: "Doctor_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Appoinment_Patient_ID",
                table: "Appoinment",
                column: "Patient_ID");

            
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Appoinment");

            migrationBuilder.DropTable(
                name: "Patient");

            migrationBuilder.DropTable(
                name: "Doctor");
        }
    }
}
