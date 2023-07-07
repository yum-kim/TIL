function solution(n) {
    let arr = [];   
    let x = 1;
    for (let i = 0; i < n; i++) {
        if (n % x === 1) arr.push(x);
        x++;
    }

    let answer = arr.sort((a,b) => {return a - b});
    
    for (let el of answer) {
        if (el >= answer[0]) return el;
    }
    
}