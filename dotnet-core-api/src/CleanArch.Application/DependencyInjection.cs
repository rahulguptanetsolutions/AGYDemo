using CleanArch.Application.Interfaces;
using CleanArch.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace CleanArch.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IAuthService, AuthService>();
            return services;
        }
    }
}
