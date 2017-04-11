# -*- coding: utf-8 -*-
def MatrixsSum(first_matrix, second_matrix):
    return [[first_matrix[i][j] + second_matrix[i][j] for j in range(0, len(first_matrix[i]))]
            for i in range(0, len(first_matrix))]


def MatrixsSub(first_matrix, second_matrix):
    return [[first_matrix[i][j] - second_matrix[i][j] for j in range(0, len(first_matrix[i]))]
            for i in range(0, len(first_matrix))]


def MatrixMultNumber(first_matrix, number):
    return [[first_matrix[i][j] * number for j in range(0, len(first_matrix[i]))]
            for i in range(0, len(first_matrix))]


def TransposeMatrix(matrix):
    return [[matrix[i][j] for i in range(0, len(matrix))]
            for j in range(0, len(matrix[0]))]


def MatrixsMult(first_matrix, second_matrix):
    result_matrix = []
    for i in range(0, len(first_matrix)):
        result_matrix.append([])
        for j in range(0, len(second_matrix[0])):
            mult_sum = 0
            for k in range(0, len(first_matrix[0])):
                mult_sum += first_matrix[i][k] * second_matrix[k][j]
            result_matrix[i].append(mult_sum)
    return result_matrix


# Вычеркивание из матрицы строки и столбца
def GetMatrixWithoutRowAndColumn(matrix, row, column):
    result_matrix = []
    for i, r in enumerate(matrix):
        if i != row:
            result_matrix.append([])
            for j, cell in enumerate(matrix[i]):
                if j != column:
                    result_matrix[len(result_matrix) - 1].append(cell)
    return result_matrix


def MatrixDeterminant(matrix):
    if len(matrix[0]) == 1:
        return matrix[0][0]

    result = 0
    for j, cell in enumerate(matrix[0]):
        buff_matrix = GetMatrixWithoutRowAndColumn(matrix, 0, j)
        result += ((-1) ** (j)) * cell * MatrixDeterminant(buff_matrix)
    return result
