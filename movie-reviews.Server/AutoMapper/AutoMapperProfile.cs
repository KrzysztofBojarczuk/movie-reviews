using AutoMapper;
using movie_reviews.Server.Dtos;
using movie_reviews.Server.models;

namespace movie_reviews.Server.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ReviewCreateDto, Review>();
            CreateMap<Review, ReviewGetDto>();
        }
    }
}
