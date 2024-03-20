using Microsoft.AspNetCore.Identity;
using System.Diagnostics;

namespace movie_reviews.Server.models
{
    public class AppUser : IdentityUser
    {
        public ICollection<Review> Review { get; set; }
    }
}
