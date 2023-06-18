function solution(s) {
    if (s.length % 2 !== 0) return 0;
    let stack = [];
    
    for (let x of s) {
        if (x === stack[stack.length - 1]) {
            stack.pop();
        } else {
            stack.push(x);
        }
    }
    
    return stack.length == 0 ? 1 : 0;
}