using FluentValidation;
using Portfolio.Application.DTOs.User;

namespace Portfolio.Application.Validators.User;

public class UpdateUserProfileRequestValidator : AbstractValidator<UpdateUserProfileRequest>
{
    public UpdateUserProfileRequestValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty().WithMessage("Ad Soyad boş bırakılamaz.")
            .MaximumLength(100).WithMessage("Ad Soyad en fazla 100 karakter olabilir.");

        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Unvan boş bırakılamaz.")
            .MaximumLength(100).WithMessage("Unvan en fazla 100 karakter olabilir.");
    }
}
