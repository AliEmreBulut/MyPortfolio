using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Application.Interfaces;
using Portfolio.Application.Services;
using System.Reflection;

namespace Portfolio.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<ISkillService, SkillService>();
        services.AddScoped<IExperienceService, ExperienceService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IAiService, AiService>();
        
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        
        return services;
    }
}
