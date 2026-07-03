using FluentValidation;
using Portfolio.Application.DTOs.Project;

namespace Portfolio.Application.Validators.Project;

public class CreateProjectRequestValidator : AbstractValidator<CreateProjectRequest>
{
    public CreateProjectRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Proje başlığı boş bırakılamaz.")
            .MaximumLength(200).WithMessage("Proje başlığı en fazla 200 karakter olabilir.");

        RuleFor(x => x.ShortSummary)
            .MaximumLength(500).WithMessage("Kısa özet en fazla 500 karakter olabilir.");

        RuleFor(x => x.DetailedDescription)
            .MaximumLength(5000).WithMessage("Detaylı açıklama en fazla 5000 karakter olabilir.");

        RuleFor(x => x.GithubUrl)
            .MaximumLength(500).WithMessage("Github URL en fazla 500 karakter olabilir.");

        RuleFor(x => x.LiveUrl)
            .MaximumLength(500).WithMessage("Canlı site URL en fazla 500 karakter olabilir.");
    }
}
