import json

from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
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
            for j in range(0, int(request.POST.get('MatrixHeight', 0))):
                fm[i].append(int(request.POST.get('FirstMatrix:' + str(i) + '_' + str(j), 0)))

        for i in range(0, int(request.POST.get('SecondMatrixHeight', 0))):
            sm.append([])
            for j in range(0, int(request.POST.get('SecondMatrixHeight', 0))):
                sm[i].append(int(request.POST.get('SecondMatrix:' + str(i) + '_' + str(j), 0)))

        answer = [[fm[i][j]+sm[i][j] for j in range(0, len(fm[i]))] for i in range(0, len(fm))]
        #
        # for i in range(0, len(fm)):
        #     answer.append([])
        # for j in range(0, len(fm[i]):
        #     answer[i].append(request.POST.get('FirstMatrix:' + str(i) + '_' + str(j), 0))

        return JsonResponse({'table': answer})

    return render(request, 'MatrixCalc/index.html', {})
