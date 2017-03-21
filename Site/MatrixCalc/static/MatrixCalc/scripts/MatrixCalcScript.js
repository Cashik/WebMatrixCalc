var fmw = $("#MatrixWidth").val(),
    fmh = $("#MatrixHeight").val(),
    smh = $("#SecondMatrixWidth").val(),
    smw = $("#MatrixWidth").val();

function UpdateMatrixsSizes() {
    fmw = $("#MatrixWidth").val();
    fmh = $("#MatrixHeight").val();
    smw = $("#SecondMatrixWidth").val();
    smh = $("#SecondMatrixHeight").val();
}

function tablesRefresh() {
    var matrixs = [$("#FirstMatrix"), $("#SecondMatrix"), $("#AnswerMatrix")];

    $("#SecondMatrixHeight").val($("#MatrixWidth").val());

    UpdateMatrixsSizes();

    matrixs.forEach(function (matrix, i, arr) {
            var tbl = document.createElement('table'),
                lw, lh;

            matrix.empty();
            tbl.classList.add("table");
            tbl.classList.add("table-bordered");

            // если выбрана операция умножения, то следует поменять кол строи и столбцов местами
            // для следующей матрицы
            console.log(matrix.attr('id'));
            operation = $('#operation');
            if (operation.find("option:selected").val() === "Умножение матриц") {
                $('.SecondMatrixWidthDiv').removeClass("hidden");
                switch (matrix.attr('id')) {
                    case "FirstMatrix": {
                        lw = fmw;
                        lh = fmh;
                    }
                        break;
                    case "SecondMatrix": {
                        lh = smh;
                        lw = smw;
                        console.log(matrix.id);
                    }
                        break;
                    case "AnswerMatrix": {
                        lw = smw;
                        lh = fmh;
                    }
                        break;
                }

            } else {
                $('.SecondMatrixWidthDiv').addClass("hidden");
                lw = fmw;
                lh = fmh;
            }

            for (var i = 0; i < lh; i++) {
                var tr = tbl.insertRow();
                for (var j = 0; j < lw; j++) {
                    var td = tr.insertCell(),
                        input = document.createElement("input");
                    var b = matrix.attr('id') + ':' + i + "_" + j;
                    input.name = input.id = b;
                    input.type = "number";
                    input.value = '0';
                    input.style.width = "100%";
                    td.appendChild(input);
                }
            }
            matrix.append(tbl);

        }
    );
}

function fillAnswerTable(table) {

    var lw, lh;
    console.log(table);
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table.length; j++) {
            console.log('#AnswerMatrix:' + i + '_' + j);
            var a = $("[name = 'AnswerMatrix:" + i + '_' + j+"'");
            a.val(table[i][j]);
        }
    }

}

$(function () {
    tablesRefresh();
    $('#operation').on('change', function () {
        var selectedTabId = $(this).find("option:selected").attr("href");
        $(".in").removeClass("in active");
        $(selectedTabId).addClass("in active");
        tablesRefresh()
    });

    $(document).on('submit', '.form', function (e) {
        e.preventDefault();
        $.ajax({
            type: this.method,
            url: this.action,
            data: ($(this).serialize()),
            context: this,
            dataType: 'json',
            success: [function (data) {
                fillAnswerTable(data.table);
            }]
        });
    });

});