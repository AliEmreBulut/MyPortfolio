using FluentValidation;
using Portfolio.Application.DTOs.Auth;

namespace Portfolio.Application.Validators.Auth;

public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Kullanıcı adı boş bırakılamaz.")
            .MaximumLength(50).WithMessage("Kullanıcı adı 50 karakteri geçemez.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Şifre boş bırakılamaz.");
    }
}
