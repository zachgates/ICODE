from random import random
import math

def chunks(l, n):
    for i in range(0, len(l), int(n)):
        yield l[i:i+int(n)]

def bincolor(n):
    clrs = {'0': 'C45656', '1': 'C49756', '2': 'B0C456',
            '3': '6EC456', '4': '56C481', '5': '56C4C3',
            '6': '5684C4', '7': '6B56C4', '8': 'AD56C4',
            '9': 'C4569A'}
    return clrs[n]

def identity(string):
    ordinals = [int((ord(c) * 10) / 5) for c in list(string)]
    stringor = ''.join(['0' * (3 % len(str(o))) + str(o) for o in ordinals])
    perfects = (math.sqrt(len(stringor)) // 1) + 1
    while perfects % 3 != 0: perfects += 1
    empty = pow(perfects, 2) - len(stringor)
    ident, i = '', 0
    while len(ident) < pow(perfects, 2):
        if (i % 3) and empty:
            a, b = random(), random()
            if a > b:
                if (empty / pow(perfects, 2)) > 0.4:
                    r = (random() * 10) // 1
                else:
                    r = (random() * 1) // 1
                if r == 0:
                    r = 1
                if r > empty:
                    r = int(empty)
                empty -= r
                while r > 0:
                    ident += '-'
                    r -= 1
        try:
            ident += stringor[i]
            i += 1
        except:
            ident += '-'
    return ident, perfects

def cells(string):
    ident, ps = identity(string)
    co = []
    for cell in ident:
        if cell.isdigit():
            co.append(bincolor(cell))
        else:
            co.append('CCCCCC')
    return list(chunks(co, ps))

x = cells('')
print(x)
