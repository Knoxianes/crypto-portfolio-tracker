function ConvertNumber(num: string): string {
    const splitedNum = num.split(".")
    const afterDot = splitedNum[1]
    let beforeDot = splitedNum[0]
    if (beforeDot.length <= 3) {
        return num;
    }
    const beforeDotArray = [];
    let counter = 0;
    while (beforeDot.length > 3) {
        if (beforeDot.length % 3 !== 0) {
            beforeDotArray.push(beforeDot.slice(0, beforeDot.length % 3))
            beforeDot = beforeDot.slice(beforeDot.length % 3)
            continue;
        }
        if(counter === 3){
            beforeDotArray.push(beforeDot.slice(0,counter))
            beforeDot = beforeDot.slice(counter)
            counter = 0;
            continue;
        }
        counter ++;
    }
    beforeDotArray.push(beforeDot)
    return  beforeDotArray.join() + "." + afterDot
}


export { ConvertNumber };
