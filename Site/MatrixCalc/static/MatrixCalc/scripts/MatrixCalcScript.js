// глобальные переменные для содержания текщих размеров матриц
var fmw = $("#MatrixWidth").val(),
    fmh = $("#MatrixHeight").val(),
    smh = $("#SecondMatrixWidth").val(),
    smw = $("#MatrixWidth").val();

// функия обновления глобальных переменных размеров матриц
function UpdateMatrixsSizes() {
    fmw = $("#MatrixWidth").val();
    fmh = $("#MatrixHeight").val();
    smw = $("#SecondMatrixWidth").val();
    smh = $("#SecondMatrixHeight").val();
}

// функция, которая обновляет все матрицы веб-страницы
function tablesRefresh() {
    // массив из матриц, которые нужно обновить
    var matrixs = [$("#FirstMatrix"), $("#SecondMatrix"), $("#AnswerMatrix")];

    // обновляем значение элемента высоты второй матрицы
    // это значение всегда равно значению высоты первой матрицы
    // но обновляется, для читабельноти кода
    $("#SecondMatrixHeight").val($("#MatrixWidth").val());

    UpdateMatrixsSizes();

    // цикл по каждой их матриц
    matrixs.forEach(function (matrix, i, arr) {
            var tbl = document.createElement('table'),
                lw, lh;

            matrix.empty();
            tbl.classList.add("table");
            tbl.classList.add("table-bordered");

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
            } else if (operation.find("option:selected").val() === "Транспонирование" && matrix.attr('id') == "AnswerMatrix") {
                $('.SecondMatrixWidthDiv').addClass("hidden");
                lw = fmh;
                lh = fmw;
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
    )
    ;
}

function fillAnswerTable(table) {

    console.log(table);
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
            $("[name = 'AnswerMatrix:" + i + '_' + j + "'").val(table[i][j]);
        }
    }

}
/* то же, что и  $( document ).ready(function() {});
 т.е функция, которая выполнится после полной загрузки страницы */
$(function () {
    tablesRefresh();
    $('.tableSizeInput').on('change', function () {
        tablesRefresh()
    });

    $('#operation').on('change', function () {
        // делаем все блоки ввода невидимыми
        $(".in").removeClass("in active");
        // делаем видимым только тот блок, id которого указанно в выбранной опции
        var selectedTabId = $(this).find("option:selected").attr("href");
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
                if (operation.find("option:selected").val() === "Найти определитель") {
                    $("#det_answer").html(data.answer);
                    $("#detModal").modal();
                } else {
                    fillAnswerTable(data.answer);
                }

            }]
        });
    });

});