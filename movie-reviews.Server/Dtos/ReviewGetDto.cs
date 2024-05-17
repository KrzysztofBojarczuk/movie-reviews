namespace movie_reviews.Server.Dtos
{
    public class ReviewGetDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; }
        public int NumberOfHours { get; set; }
        public decimal Rate { get; set; }
        public decimal CostOfReview { get; set; }
    }
}
