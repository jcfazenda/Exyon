namespace Api.Domain.Configure
{
    using Api.Domain.Automapper;
    using Api.Domain.Repository.Interface;
    using Api.Domain.Repository.Queryable;
    using AutoMapper;
    using Microsoft.Extensions.DependencyInjection;

    public class NativeInjector
    {
        public static void RegisterServices(IServiceCollection services)
        {          
            services.AddSingleton<IRequestManager, InMemoryRequestManager>(); /* Circular Queue */
            Mapper.Initialize(x => x.ConfigureApplicationProfiles());
            services.AddScoped<IMapper>(sp => new Mapper(sp.GetRequiredService<IConfigurationProvider>(), sp.GetService));
            
            // UserNativeInjection.RegisterServices(services);

            services.AddScoped<BancoDadosContext>(); /* usuarios */

            /* TABLES */
            services.AddScoped<IUsersRepository, UsersRepository>();

            RegisterGenericsEventsDomain(services);
        }
        private static void RegisterGenericsEventsDomain(IServiceCollection services)
        {
            services.AddScoped<IHttpClientHelper, HttpClientHelper>(); /* Fornece um local central para nomear e configurar HttpClientinstâncias lógicas */
        }
    }
}
