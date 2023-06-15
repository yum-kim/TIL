function solution(s) {
    let arr = s.split(' ').map((e) => parseInt(e));
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    
    return `${min} ${max}`;
}