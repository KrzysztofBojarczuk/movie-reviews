using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using movie_reviews.Server.Data;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.models;
using movie_reviews.Server.Repository;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddScoped<IUserRepository, UsersRepository>();
builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
builder.Services.AddScoped<IMovieRepository, MovieRepository>();

builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);
builder.Services.AddAuthorizationBuilder();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentityCore<AppUser>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddApiEndpoints();

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireRole",
         policy => policy.RequireRole("Administrator", "User", "Spectator"));
});

var app = builder.Build();

app.MapIdentityApi<AppUser>();

//Asp.net Middleware
app.UseRequestLogging();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(builder => builder
    .WithOrigins("https://localhost:4200")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.MapGet("/validate-access-token", () => Results.Ok(true)).RequireAuthorization();

app.Run();
