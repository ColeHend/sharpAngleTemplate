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

builder.Services.AddSingleton<IDbJsonService, DbJsonService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy(name: localOrigins,
//                       builder =>
//                       {
//                           builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowAnyOrigin(); 
//                       });
// });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.UseStaticFiles("/client");
// app.UseCors(localOrigins);
app.UseRouting();
app.UseAuthorization();

app.UseEndpoints(
        endpoints =>
        {
            endpoints.MapDefaultControllerRoute();
        });

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "client"; 
    
    if (app.Environment.IsDevelopment())
    {
        spa.UseAngularCliServer("ng serve");
    }
});
app.Run();
