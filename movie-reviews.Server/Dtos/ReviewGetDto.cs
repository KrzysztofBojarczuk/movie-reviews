namespace movie_reviews.Server.Dtos
{
    public class ReviewGetDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
    }
}
