function solution(n) {
    let sum = 0;
    let i = 2;
    let arr = [0, 1];
    
    while (i <= n) {
        sum = arr[i - 2] + arr[i - 1];
        arr.push(sum % 1234567);
        
        if (i == n) {
            return sum % 1234567;
        }
        
        i++;
    }
}