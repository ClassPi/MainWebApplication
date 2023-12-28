using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace MainWebApplication;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.WebHost.ConfigureKestrel(options =>
        {
            options.ListenAnyIP(2686); // HTTP
        });
        // Add services to the container.
        builder.Services.AddSingleton<IFileProvider>(new PhysicalFileProvider(Directory.GetCurrentDirectory()));
        builder.Services.AddControllersWithViews();

        builder.Services.AddAuthorization();
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
         .AddJwtBearer(options =>
         {
             options.TokenValidationParameters = new TokenValidationParameters()
             {
                 ValidateIssuerSigningKey = true,
                 // 是否验证颁发者
                 ValidateIssuer = true,
                 // 是否验证访问群体
                 ValidateAudience = true,
                 // 是否验证生存期
                 ValidateLifetime = true,
                 // 验证Token的时间偏移量
                 ClockSkew = TimeSpan.FromSeconds(30),
                 // 验证颁发者
                 ValidIssuer = builder.Configuration["JWT:Issuer"],
                 // 验证访问群体
                 ValidAudience = builder.Configuration["JWT:Audience"],
                 // 验证密钥
                 IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Token"]!)),
             };
             options.Events = new JwtBearerEvents
             {
                 OnMessageReceived = context =>
                 {
                     var isExists = context.Request.Headers.TryGetValue("Authorization", out var token);
                     if (!isExists)
                     {
                         return Task.CompletedTask;
                     }
                     var tokenString = token.ToString();

                     if (tokenString.StartsWith("Bearer"))
                         context.Token = tokenString[6..];
                     return Task.CompletedTask;
                 },
                 OnForbidden = context =>
                 {
                     return Task.CompletedTask;
                 },
                 OnAuthenticationFailed = context =>
                 {
                     return Task.CompletedTask;
                 }
             };
         });
        var app = builder.Build();
        app.Use(async (context, next) =>
                        {
                            if (context.Request.Cookies.TryGetValue("Authorization", out var headerToken))
                                context.Request.Headers["Authorization"] = headerToken;
                            else
                                context.Request.Headers["Authorization"] = string.Empty;
                            await next.Invoke();
                        });

        app.UseHttpsRedirection();

        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthorization();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=auth}/{action=login}/{id?}");
        app.Run();

    }
}