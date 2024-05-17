namespace movie_reviews.Server.Dtos
{
    public class ReviewCreateDto
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public string AppUserId { get; set; }
        public int MovieId { get; set; }
        public int NumberOfHours { get; set; }
        public decimal Rate { get; set; }
        public decimal CostOfReview { get; set; }
    }
}
