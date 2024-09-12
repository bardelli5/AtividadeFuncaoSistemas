$(document).ready(function () {
    $("#CpfBeneficiario").on("input", function () {
        var cpf = $(this).val();
        cpf = cpf.replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        $(this).val(cpf);
    });
})



function modalBeneficiarios(idCliente) {
    let urlCompleto = "/Beneficiario/BeneficiarioList";

    $.ajax({
        method: "GET",
        url: urlCompleto,
        data: { idCliente: idCliente },
        success: function (dados) {
            if (dados.Result == "OK") {
                $(".linha-cpf").empty();
                $(".linha-nome").empty();
                $(".linha-acoes").empty();

                var editarBeneficiarioModelo = $("#editar-beneficiario-linhas");

                var tabela = $(".tbody-tabela-modal");
                tabela.empty();
                tabela.append(editarBeneficiarioModelo);

                $.each(dados.BeneficiarioList, function (index, item) {
                    var linha = "<tr class=\"tableRow\" + id=\"" + item.Id + "\">" +
                        "<td class=\"cpf\">" + item.Cpf + "</td>" +
                        "<td class=\"nome\">" + item.Nome + "</td>" +
                        "<td>" + '<button style="margin-right:10px;" class="btn btn-primary btn-sm alterarBeneficiario">Alterar</button>' + '<button class="btn btn-primary btn-sm excluir">Excluir</button>' + "</td>" +
                        "</tr>";
                    tabela.append(linha);
                });
            }
        }
    });
}

$(".incluir").on("click", function () {

    var idCliente = $("#idCliente").val();
    var cpf = $("#CpfBeneficiario").val();
    var nome = $("#NomeBeneficiario").val();


    const dadosForm = {
        IdCliente: idCliente,
        Cpf: cpf,
        Nome: nome,
    };

    $.ajax({
        method: "POST",
        url: "/Beneficiario/Incluir",
        data: JSON.stringify(dadosForm),
        contentType: "application/json",
        success: function (dados) {
            if (dados.Result == "OK") {
                setTimeout(function () { location.reload(true); }, 2000);
                ModalDialog("Sucesso!", dados.Message);
            }
            else {
                ModalDialog("Ocorreu um erro", dados.Message);
            }
        },
        error: function (r) {
            if (r.status == 400) {
                ModalDialog("Ocorreu um erro", r.responseJSON);
            }
            else if (r.status == 500) {
                ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            }
        },
    });
});

$(document).delegate(".alterarBeneficiario", "click", function () {
    var clickedRow = $(this).closest("tr");
    var cpfField = clickedRow.clone().children().closest(".cpf").text();
    var nomeField = clickedRow.clone().children().closest(".nome").text();

    var id = clickedRow.attr("id").toString();

    clickedRow.hide();

    var editarBeneficiario = $("#editar-beneficiario-linhas").clone().insertAfter(clickedRow);
    editarBeneficiario.attr("id", "beneficiario-atualizar-" + id);
    editarBeneficiario.show();
    var cpfInput = editarBeneficiario.children().closest(".cpf").children("input.input-cpf");
    var nameInput = editarBeneficiario.children().closest(".nome").find("input.input-nome");
    cpfInput.val(cpfField);
    nameInput.val(nomeField);
})

$(document).delegate(".cancelar", "click", function () {
    var clickedRow = $(this).closest("tr")
    var id = clickedRow.attr("id").toString().split('-')[2]

    $("#" + id).show()

    clickedRow.remove()
})

$(document).delegate(".atualizar", "click", function () {
    // mandar requisicao de atualizar para o ajax
    // quando sucesso, fazer:
    //pega tag tr (linha tabela):
    var clickedRow = $(this).closest("tr");
    //3 tds
    var cpfInput = clickedRow.children().closest(".cpf").children("input.input-cpf");
    var nameInput = clickedRow.children().closest(".nome").find("input.input-nome");
    var id = clickedRow.attr("id").toString().split('-')[2]

    const dadosForm = {
        Id: id,
        Cpf: cpfInput.val(),
        Nome: nameInput.val(),
    };

    $.ajax({
        method: "POST",
        url: "/Beneficiario/Alterar",
        data: JSON.stringify(dadosForm),
        contentType: "application/json",
        success: function (dados) {
            if (dados.Result == "OK") {
                ModalDialog("Sucesso!", dados.Message);
                var beneficiario = $("#" + id);
                beneficiario.show();
                var cpfField = beneficiario.children().closest(".cpf");
                var nomeField = beneficiario.children().closest(".nome");
                cpfField.text(cpfInput.val());
                nomeField.text(nameInput.val());

                clickedRow.remove();
            }
            else {
                ModalDialog("Ocorreu um erro", dados.Message);
            }
        },
        error: function (r) {
            if (r.status == 400) {
                ModalDialog("Ocorreu um erro", r.responseJSON);
            }
            else if (r.status == 500) {
                ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            }
        },
    });
})

$(document).delegate(".excluir", "click", function () {
    var clickedRow = $(this).closest("tr")
    var id = clickedRow.attr("id").toString()

    $.ajax({
        method: "POST",
        url: "/Beneficiario/Excluir/" + id,
        success: function (dados) {
            if (dados.Result == "OK") {
                ModalDialog("Sucesso!", dados.Message);
                clickedRow.remove();
            }
            else {
                ModalDialog("Ocorreu um erro", dados.Message);
            }
        }
    });
})

$(document).delegate("#editarCpfBenef", "input", function () {
    var cpf = $(this).val();
    cpf = cpf.replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    $(this).val(cpf);
});

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var modal = '<div id="' + random + '" class="modal fade modalMensagem">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close fecharModal" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(modal);
    $('#' + random).modal('show');
}