
namespace Api.Domain.Configure
{
    using Api.Domain.Repository.Interface;
    using Api.Domain.Repository.Queryable;
    using Microsoft.Extensions.DependencyInjection;

    public class UserNativeInjection
    {
        public static void RegisterServices(IServiceCollection services)
        {
            RegisterUserServices(services);
            RegisterRepositories(services);
            RegisterCommands(services);
        }

        private static void RegisterRepositories(IServiceCollection services)
        {
            /* TABELAS */
            services.AddScoped<IUsersRepository,  UsersRepository>(); 

        }

        private static void RegisterUserServices(IServiceCollection services)
        {
        }

        private static void RegisterCommands(IServiceCollection services)
        {
        }

    }
}
