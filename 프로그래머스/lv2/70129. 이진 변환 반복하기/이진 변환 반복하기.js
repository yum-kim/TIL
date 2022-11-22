function solution(s) {
    let count = 0;
    let zero = 0;
    
    while(s != '1') {
        let len = s.length;
        s = s.replaceAll('0',''); //1111
        zero += (len - s.length);
        s = s.length.toString(2);
        count++;
    }    
        
    return [count, zero];
}