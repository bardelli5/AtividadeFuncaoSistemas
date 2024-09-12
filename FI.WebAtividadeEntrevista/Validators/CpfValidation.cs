using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

public class CpfValidation : ValidationAttribute
{
    public string Cpf { get; set; }
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (string.IsNullOrEmpty(Cpf))
        {
            return ValidationResult.Success;
        }

        Cpf = value.ToString();
        Cpf = Cpf.Replace(".", "").Replace("-", "");

        if (Cpf.Length != 11 || !Regex.IsMatch(Cpf, @"^\d{11}$"))
        {
            return new ValidationResult("CPF inválido.");
        }

        int[] multiplicador1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
        int[] multiplicador2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

        string tempCpf = Cpf.Substring(0, 9);
        int soma = 0;

        for (int i = 0; i < 9; i++)
            soma += int.Parse(tempCpf[i].ToString()) * multiplicador1[i];

        int resto = soma % 11;
        if (resto < 2)
            resto = 0;
        else
            resto = 11 - resto;

        string digito = resto.ToString();

        tempCpf = tempCpf + digito;
        soma = 0;

        for (int i = 0; i < 10; i++)
            soma += int.Parse(tempCpf[i].ToString()) * multiplicador2[i];

        resto = soma % 11;
        if (resto < 2)
            resto = 0;
        else
            resto = 11 - resto;

        digito = digito + resto.ToString();

        if (!Cpf.EndsWith(digito))
        {
            return new ValidationResult("CPF inválido.");
        }

        return ValidationResult.Success;
    }
}