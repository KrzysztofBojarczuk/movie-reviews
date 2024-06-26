﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace movie_reviews.Server.models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Text { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        [Range(0, 10)]
        public int? Rating { get; set; }
        [ForeignKey("AppUser")]
        public string? AppUserId { get; set; }
        public AppUser? AppUser { get; set; }
        [ForeignKey("Movie")]
        public int? MovieId { get; set; }
        public Movie? Movie { get; set; }
        public int NumberOfHours { get; set; }
        public decimal Rate { get; set; }
        public decimal CostOfReview { get; set; }
    }
}
