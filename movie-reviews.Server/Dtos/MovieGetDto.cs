namespace movie_reviews.Server.Dtos
{
    public class MovieGetDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public DateTime? Releasetime { get; set; }
    }
}
