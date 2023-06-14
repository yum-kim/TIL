function solution(s) {
    let answer = [];
    const splitedWords = s.split(' ');
    
    for (let i = 0; i < splitedWords.length; i++) {
        let str = splitedWords[i].split('').map((value, index) => {
            if (index == 0 && (/[a-zA-Z]/).test(value)) {
                return value.toUpperCase();
            } else {
                return value.toLowerCase();
            }
        }).join(''); //3people
        
        answer.push(str);
    }

    return answer.join(' ');
}