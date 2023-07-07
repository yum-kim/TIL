function solution(arr) {
    let balance = 0;
    const sum = arr.reduce((acc, current) => {
        return acc += current;
    }, 0)
    
    return sum / arr.length;
}