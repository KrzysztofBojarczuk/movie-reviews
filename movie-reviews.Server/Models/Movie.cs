﻿using System.ComponentModel.DataAnnotations;

namespace movie_reviews.Server.models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public DateTime Releasetime { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }
}
