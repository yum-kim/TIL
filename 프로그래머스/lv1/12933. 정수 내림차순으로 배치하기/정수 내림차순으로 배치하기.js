function solution(n) {
    let arr = n.toString().split('').map(el => parseInt(el));
    return parseInt(arr.sort((a,b) => {return b - a}).join(''));
}