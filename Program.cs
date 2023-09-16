using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using sharpAngleTemplate.Controllers;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using sharpAngleTemplate.tools;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var localOrigins = "_myAllowLocalOrigins";
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: localOrigins,
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:4410",
                                              "https://localhost:4411").AllowAnyHeader().AllowAnyMethod();
                      });
});
builder.Services.AddSingleton<IDbJsonService, DbJsonService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors(localOrigins);
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("index.html");
app.UseSpa(spa =>
{
    spa.Options.SourcePath = "client"; 
    
    if (app.Environment.IsDevelopment())
    {
        spa.UseAngularCliServer("ng serve");
    }
});
app.Run();
