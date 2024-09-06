using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;
using System.Web.Services.Description;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                string cpfSemPontuacao = model.Cpf.Replace(".", "").Replace("-", "");
                var cpfJaExiste = bo.VerificarExistencia(cpfSemPontuacao);
                if (cpfJaExiste)
                {
                    return Json(new { Result = "ERRO", Message = "O Cpf informado já foi vinculado a um beneficiário. Favor informar outro Cpf." });
                }

                model.Id = bo.Incluir(new Beneficiario()
                {
                    Nome = model.Nome,
                    Cpf = cpfSemPontuacao,
                    IdCliente = model.IdCliente,
                });


                return Json(new { Result = "OK", Message = "Cadastro efetuado com sucesso." });
            }
        }

        [HttpPost]
        public JsonResult Alterar(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                string cpfSemPontuacao = model.Cpf.Replace(".", "").Replace("-", "");
                var cpfJaExiste = bo.VerificarExistencia(cpfSemPontuacao);
                if (cpfJaExiste)
                {
                    return Json(new { Result = "ERROR", Message = "O Cpf informado já foi vinculado a um beneficiário. Favor informar outro Cpf."});
                }
                bo.Alterar(new Beneficiario()
                {
                    Id = model.Id,
                    Nome = model.Nome,
                    Cpf = cpfSemPontuacao
                });

                return Json(new { Result = "OK", Message = "Cadastro alterado com sucesso." });
            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            Beneficiario beneficiario = bo.Consultar(id);
            BeneficiarioModel model = null;

            if (beneficiario != null)
            {
                model = new BeneficiarioModel()
                {
                    Id = beneficiario.Id,
                    Nome = beneficiario.Nome,
                    Cpf = beneficiario.Cpf
                };


            }

            return View(model);
        }

        [HttpPost]
        public JsonResult Excluir(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();

            bo.Excluir(id);

            return Json(new { Result = "OK", Message = "Cadastro excluído com sucesso." });

        }

        [HttpGet]
        public JsonResult BeneficiarioList(long idCliente)
        {
            try
            {
                List<Beneficiario> listaAtualizada = new List<Beneficiario>();
                var beneficiarios = new BoBeneficiario().Pesquisa(idCliente);
                foreach (var item in beneficiarios)
                {
                    item.Cpf = Convert.ToUInt64(item.Cpf).ToString(@"000\.000\.000\-00");
                    listaAtualizada.Add(item);
                }

                //Return result
                return Json(new { Result = "OK", BeneficiarioList = listaAtualizada }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}