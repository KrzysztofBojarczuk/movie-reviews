using Microsoft.AspNetCore.Identity;
using System.Diagnostics;

namespace movie_reviews.Server.models
{
    public class AppUser : IdentityUser
    {
        public bool Active { get; set; }
        public int NumberOfReviews { get; set; }
        public ICollection<Review> Review { get; set; }
    }
}
