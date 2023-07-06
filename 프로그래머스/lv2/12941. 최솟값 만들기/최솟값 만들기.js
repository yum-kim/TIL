function solution(A,B){
    A.sort((a,b) => a - b);
    B.sort((a,b) => b - a);
    let answer = A.reduce((acc, current, i) => {
        return acc + (current * B[i])
    }, 0);
    
    return answer;
}