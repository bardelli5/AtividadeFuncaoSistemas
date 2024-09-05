using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    /// <summary>
    /// Classe de Modelo de Cliente
    /// </summary>
    public class BeneficiarioModel
        {
        public long Id { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        [Required(ErrorMessage = "O Nome é obrigatório")]
        public string Nome { get; set; }

        /// <summary>
        /// Cpf
        /// </summary>
        [Required(ErrorMessage = "O CPF é obrigatório")]
        [CpfValidation(ErrorMessage = "CPF inválido.")]
        public string Cpf { get; set; }

        }    
}