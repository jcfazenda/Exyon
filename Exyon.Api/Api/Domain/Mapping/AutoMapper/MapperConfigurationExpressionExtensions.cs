using Api.Domain.Configuration.AutoMapper;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Domain.Automapper
{
    public static class MapperConfigurationExpressionExtensions
    {
        public static void ConfigureApplicationProfiles(this IMapperConfigurationExpression mapperConfiguration)
        {
            mapperConfiguration.AddProfile(new DomainToViewModelProfile());

        }
    }
}
