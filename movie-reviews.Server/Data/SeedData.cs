using Microsoft.AspNetCore.Identity;
using movie_reviews.Server.models;

namespace movie_reviews.Server.Data
{
    public static class SeedData
    {
        public static async Task SeedAdminUser(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<AppUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            string adminEmail = "admin@example.com";
            string adminPassword = "Admin@12345";

            if (await roleManager.FindByNameAsync("Administrator") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("Administrator"));
            }

            if (await userManager.FindByEmailAsync(adminEmail) == null)
            {
                var adminUser = new AppUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(adminUser, adminPassword);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Administrator");
                }
            }
        }
    }
}
