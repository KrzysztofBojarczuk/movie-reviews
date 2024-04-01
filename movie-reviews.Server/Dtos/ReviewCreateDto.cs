namespace movie_reviews.Server.Dtos
{
    public class ReviewCreateDto
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public string AppUserId { get; set; }
    }
}
