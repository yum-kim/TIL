window.onload = function (){
    const API_URL = 'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev';

    const input = document.querySelector('.SearchInput__input');
    input.addEventListener('input', (e) => onInputEvent(e.target.value));

    const suggestionList = document.querySelector('.Suggestion ul');
    suggestionList.addEventListener('click', (e) => onClickSuggestion(e.target));

    //TODO: 방향키 up, down event 추가

    initialize();

    function initialize() {
        input.focus();
        setStorageData();
    }

    function setStorageData() {
        let keyword = localStorage.getItem('keyword');
        input.value = keyword;

        let suggestionList = localStorage.getItem('suggestionList');
        console.log(suggestionList)
        setSuggestionList(keyword, suggestionList);


    }

    async function onInputEvent(message) {
        localStorage.setItem('keyword', message);
        
        // TODO: event handler가 실행중일 경우 API 호출 지연시키기!!
        setTimeout(async () => {
            const suggestions = await getData(message);
            setSuggestionList(message, suggestions);
        }, 0);
    }

    function setSuggestionList(message, data) {
        console.log(data);

        suggestionList.innerHTML = '';

        let lis = '';
        for (let i = 0; i < data.length; i++) {
            const regex = new RegExp(message, 'gi');
            const msg = data[i].match(regex);
            let highlight = data[i].replace(regex, `<span class="Suggestion__item--matched"">${msg}</span>`);
            lis += `<li>${highlight}</li>`;
        }
        suggestionList.innerHTML = lis;
        localStorage.setItem('suggestionList', data);
    }

    async function getData(message) {
        const url = `${API_URL}/languages?keyword=${message}`;

        try {
            const response = await fetch(url, {method: 'GET'});
            if (response.status !== 200) return;

            const data = await response.json();
            console.log(data);
            return data;
        } catch(e) {

        }
    }

    let seletedLanguages = [];

    function onClickSuggestion(target) {
        const seletedList = document.querySelector('.SelectedLanguage ul');

        const suggestion = target.innerText;
        alert(suggestion);

        //중복 체크해서 삭제
        let doubleCheked = seletedLanguages.filter(v => v !== suggestion);
        
        if (doubleCheked.length != seletedLanguages.length) {
            seletedList.innerHTML = '';

            for (let i = 0; i < doubleCheked.length; i++) {
                let list = document.createElement('li');
                list.innerHTML = doubleCheked[i];
                seletedList.appendChild(list);
            }
        }
        
        seletedLanguages = [...doubleCheked];

        //TODO: 5개 넘으면 마지막꺼 빼고 넣기
        if (seletedLanguages.length >= 5) {
            seletedLanguages.shift();

            for (let i = 0; i < seletedLanguages.length; i++) {
                let list = document.createElement('li');
                list.innerHTML = seletedLanguages[i];
                seletedList.appendChild(list);
            }
        }
        
        seletedLanguages.push(suggestion);

        const li = document.createElement('li');
        li.innerHTML = suggestion;
        seletedList.appendChild(li);

        localStorage.setItem('seletedLanguages', seletedLanguages);
    }

}();
