# -*- coding: utf-8 -*-

from django.http import JsonResponse
from django.shortcuts import render
from MatrixCalc.Matrix import *


def index(request):
    if request.method == 'POST':
        # Формирование матриц и создание необходимых переменных на основе данных, переданных в POST-запросе
        fm = []
        sm = []
        operation = request.POST['operation']
        number = int(request.POST['number_operand'])
        for i in range(0, int(request.POST.get('MatrixHeight', 0))):
            fm.append([])
            for j in range(0, int(request.POST.get('MatrixWidth', 0))):
                fm[i].append(int(request.POST.get('FirstMatrix:' + str(i) + '_' + str(j), 0)))
        for i in range(0, int(request.POST.get('SecondMatrixHeight', 0))):
            sm.append([])
            for j in range(0, int(request.POST.get('SecondMatrixWidth', 0))):
                sm[i].append(int(request.POST.get('SecondMatrix:' + str(i) + '_' + str(j), 0)))
        answer = 0
        # использование методов матричного модуля
        if operation == u"Сложение матриц":
            answer = MatrixsSum(fm, sm)
        elif operation == u"Вычитание матриц":
            answer = MatrixsSub(fm, sm)
        elif operation == u"Умножение матриц":
            answer = MatrixsMult(fm, sm)
        elif operation == u"Умножение матрицы на число":
            answer = MatrixMultNumber(fm, number)
        elif operation == u"Найти определитель":
            answer = MatrixDeterminant(fm)
        elif operation == u"Транспонирование":
            answer = TransposeMatrix(fm)
        # возвращение результата в формате json
        return JsonResponse({'answer': answer})

    return render(request, 'MatrixCalc/index.html', {})
