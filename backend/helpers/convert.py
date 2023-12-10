def ConvertNumber(number):
    num = str(number)
    splitednum = num.split(".")
    afterDot = splitednum[1]
    beforeDot = splitednum[0]
    if len(beforeDot) <= 3:
        return number
    beforeDotArray = []
    counter = 0
    while len(beforeDot) > 3:
        if len(beforeDot) % 3 != 0:
            beforeDotArray.append(beforeDot[0:len(beforeDot) % 3])
            beforeDot = beforeDot[len(beforeDot) % 3:]
            continue
        if counter == 3:
            beforeDotArray.append(beforeDot[0:counter])
            beforeDot = beforeDot[counter:]
            counter = 0
            continue
        counter += 1
    beforeDotArray.append(beforeDot)
    return ",".join(beforeDotArray) + "." + afterDot
