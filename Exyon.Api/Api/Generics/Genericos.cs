using System;
using System.Text.RegularExpressions;

namespace Api.Generics
{
    public class Genericos
    {
        public static string Number(string value)
        {
            try
            {
                return String.Join("", System.Text.RegularExpressions.Regex.Split(value, @"[^\d]"));
            }
            catch (Exception)
            {
                return "";
            }

        }
        public static bool IsCpf(string cpf)
        {
            cpf = Number(cpf);

            cpf = String.Join("", System.Text.RegularExpressions.Regex.Split(cpf, @"[^\d]"));
            cpf = cpf.PadLeft(11, '0');

            if (cpf.Length > 11) { return false; }

            string digito = String.Empty;
            int k, j, soma;

            for (k = 0; k < 2; k++)
            {
                soma = 0;
                for (j = 0; j < 9 + k; j++) soma += int.Parse(cpf[j].ToString()) * (10 + k - j);
                digito += (soma % 11 == 0 || soma % 11 == 1) ? 0 : (11 - (soma % 11));
            }

            var valida = (digito[0] == cpf[9] & digito[1] == cpf[10]);
            return valida;

        }
        public static string FormataCep(string cep)
        {
            try
            {
                return Convert.ToUInt64(cep).ToString(@"00000-000");
            }
            catch
            {
                return "";
            }
        }
        public static bool IsEmail(string email)
        {
            Regex rg = new Regex(@"^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$");

            if (rg.IsMatch(email))
                return true;

            return false; 
        }       
        public static string FormatData(DateTime? Date)
        {
            try
            { 
                string data = Date.Value.Day.ToString() + "/" + Date.Value.Month.ToString() + "/" + Date.Value.Year.ToString();
                return data;
            }
            catch (Exception)
            {
                return "__/__/____";
            }

        }
 
    }
}
