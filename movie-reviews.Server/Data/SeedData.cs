using Microsoft.AspNetCore.Identity;
using movie_reviews.Server.models;

namespace movie_reviews.Server.Data
{

    public static class SeedData
    {
        public static async Task SeedUser(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<AppUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            string adminEmail = "admin@example.com";
            string adminPassword = "Admin@12345";
            string userRole = "User";

            // Ensure Administrator role exists
            if (await roleManager.FindByNameAsync("Administrator") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("Administrator"));
            }

            // Ensure User role exists
            if (await roleManager.FindByNameAsync(userRole) == null)
            {
                await roleManager.CreateAsync(new IdentityRole(userRole));
            }

            // Seed admin user
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

            // Seed two users with role "User"
            string userEmail1 = $"user1@example.com";
            string userPassword1 = $"User1@12345";

            if (await userManager.FindByEmailAsync(userEmail1) == null)
            {
                var user1 = new AppUser
                {
                    UserName = userEmail1,
                    Email = userEmail1,
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(user1, userPassword1);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user1, userRole);
                }
            }

            string userEmail2 = $"user2@example.com";
            string userPassword2 = $"User2@12345";

            if (await userManager.FindByEmailAsync(userEmail2) == null)
            {
                var user2 = new AppUser
                {
                    UserName = userEmail2,
                    Email = userEmail2,
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(user2, userPassword2);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user2, userRole);
                }
            }
        }
    }
}
