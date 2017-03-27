import json

from django.http import JsonResponse
from django.shortcuts import render
from MatrixCalc.Matrix import *

from django.http import HttpResponse
from django.template import loader
from django.template.loader import render_to_string


def index(request):
    if request.method == 'POST':
        operation = request.POST.get('operation', '')
        print(request.POST)
        fm = []
        sm = []

        for i in range(0, int(request.POST.get('MatrixHeight', 0))):
            fm.append([])
            for j in range(0, int(request.POST.get('MatrixWidth', 0))):
                fm[i].append(int(request.POST.get('FirstMatrix:' + str(i) + '_' + str(j), 0)))

        for i in range(0, int(request.POST.get('SecondMatrixHeight', 0))):
            sm.append([])
            for j in range(0, int(request.POST.get('SecondMatrixWidth', 0))):
                sm[i].append(int(request.POST.get('SecondMatrix:' + str(i) + '_' + str(j), 0)))

        number = int(request.POST['number_operand'])

        answer = 0

        if operation == "Сложение матриц":
            answer = MatrixsSum(fm, sm)
        elif operation == "Вычитание матриц":
            answer = MatrixsSub(fm, sm)
        elif operation == "Умножение матриц":
            answer = MatrixsMult(fm, sm)
        elif operation == "Умножение матрицы на число":
            answer = MatrixMultNumber(fm, number)
        elif operation == "Найти определитель":
            answer = MatrixDeterminant(fm)
        elif operation == "Транспонирование":
            answer = TransposeMatrix(fm)

        return JsonResponse({'answer': answer})

    return render(request, 'MatrixCalc/index.html', {})

