import random

def toChar(i):
    if int(i):
        return "-ABCDEF"[len(i)]
    return str(len(i))

def toBin(i):
    if i.isdigit():
        return "0" * int(i)
    return "1" * "-ABCDEF".index(i)

def iicode(uon):
    uin = ''
    for c in uon:
        f = format(ord(c), 'b')
        uin += (8 - len(f)) * "0"
        uin += f
    stack = list(uin)[::-1]
    empty, char, count = [], stack.pop(), 1
    while stack:
        i = stack.pop()
        if char == i and count < 6:
            count += 1
        else:
            empty.append(char * count)
            char = i
            count = 1
    else:
        empty.append(char * count)
    ic = ''.join(map(toChar, empty))
    ic += "0" * (6 - (len(ic) % 6))
    return ic

icode = iicode('') # information
ccode = [icode[i:i+6] for i in range(0, len(icode), 6)] # colors
ocode = -(-(len(ccode) ** 0.5) // 1) # ordinal
dcode = [i for i in ccode] # distribution
for i in range(int(ocode ** 2) - len(ccode)):
    dcode.insert(random.randrange(len(ccode)), "000000")

print(dcode)