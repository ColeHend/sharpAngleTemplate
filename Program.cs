using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using sharpAngleTemplate.Controllers;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using sharpAngleTemplate.tools;
using sharpAngleTemplate.data;
using Microsoft.EntityFrameworkCore;
using sharpAngleTemplate.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using sharpAngleTemplate.models.entities;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

//------------- Add services to the container.-------------
builder.Services.AddControllers();

builder.Services.AddSingleton<IPokemonMapper,PokemonMapper>();
builder.Services.AddSingleton<IUserMapper,UserMapper>();

builder.Services.AddTransient<IDbJsonService, DbJsonService>();
builder.Services.AddTransient<ISQLPokemonRepository, SQLPokemonRepository>();
builder.Services.AddTransient<ITokenRepository, TokenRepository>();

// ----- Add Database Stuff ----

var connString = builder.Configuration.GetConnectionString("localDefault");
builder.Services.AddDbContext<SharpAngleContext>(options=>options.UseSqlServer(connString));
// builder.Services.AddDbContext<SessionContext>(options=>options.UseSqlServer(connString));

// builder.Services.AddIdentityCore<User>()
//     .AddRoles<IdentityRole>()
//     .AddTokenProvider<DataProtectorTokenProvider<User>>("AuthProv")
//     .AddEntityFrameworkStores<SharpAngleContext>()
//     .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase  = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredUniqueChars = 1;
    options.Password.RequiredLength = 6;
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters{
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey= true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    });

builder.Services.AddHttpContextAccessor();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c=>{
    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme {
        Description = "Example Value: bearer {token}",
        In=ParameterLocation.Header,
        Name="Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    c.OperationFilter<SecurityRequirementsOperationFilter>();
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.UseStaticFiles("/client");
app.UseStaticFiles("/json");
app.UseRouting();

app.UseAuthentication();
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
