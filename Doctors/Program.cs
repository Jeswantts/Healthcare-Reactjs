using Doctors.Context;
using Doctors.DTO;
using Doctors.Interface;
using Doctors.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DoctorContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("jeswant")));
builder.Services.AddScoped<IDoctor, DoctorRepo>();
builder.Services.AddScoped<IDoctorDTO<Doctor_Patient_DTO>, DoctorService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
