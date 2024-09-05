$(document).ready(function () {
    //function modalBeneficiarios(idCliente) {
    //    $('#gridClientes').jtable({
    //        actions: {
    //            listAction: urlClienteList,
    //        },
    //        fields: {
    //            Nome: {
    //                title: 'Cpf',
    //                width: '50%'
    //            },
    //            Email: {
    //                title: 'Nome',
    //                width: '35%'
    //            },
    //            Alterar: {
    //                title: '',
    //                display: function (data) {
    //                    return '<button onclick="window.location.href=\'' + urlAlteracao + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">Alterar</button>';
    //                    return '<button onclick="window.location.href=\'' + urlAlteracao + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">Excluir</button>';
    //                }
    //            }
    //        }
    //    });
    //}

    $("#CpfBeneficiario").on("input", function () {
        var cpf = $(this).val();
        cpf = cpf.replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        $(this).val(cpf);
    });

    //Load student list from server
    //if (document.getElementById("gridClientes"))
    //    $('#gridClientes').jtable('load');
})