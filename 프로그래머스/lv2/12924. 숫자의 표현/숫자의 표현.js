function solution(n) {
    let answer = 0;
    
    for (let i = 1; i <= n / 2; i++) {        
        let sum = 0;
        for (let j = i; j <= n; j++) {
            sum += j;
            
            if (sum == n) {
                answer++;
                break;
            } else if (sum > n) {
                break;
            }
        }
    }
    
    return answer + 1;
}