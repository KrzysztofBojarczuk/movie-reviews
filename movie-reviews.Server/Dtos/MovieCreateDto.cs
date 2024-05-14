using movie_reviews.Server.Enum;

namespace movie_reviews.Server.Dtos
{
    public class MovieCreateDto
    {
        public string? Title { get; set; }
        public DateTime Releasetime { get; set; }
        public Category Category { get; set; }
    }
}
