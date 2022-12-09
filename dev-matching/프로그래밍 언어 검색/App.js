import SearchInput from './component/SearchInput.js';
import Suggestion from './component/Suggestion.js';
import { fetchLanguages } from './component/api.js';
import SelectedLanguages from './component/SelectedLanguages.js';

export default function App({ $target }) {
    const initialState = {
        seletedLanguages: {
            items: []
        },
        suggestions: {
            keyword: '',
            items: [],
            selectedIndex: 0
        }
    }

    const storageData = JSON.parse(localStorage.getItem('state'));

    //initial state set
    if (storageData) {
        this.state = storageData;
    } else {
        this.state = initialState;
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }

        suggestion.setState({
            keyword: this.state.suggestions.keyword,
            items: this.state.suggestions.items,
            selectedIndex: this.state.suggestions.selectedIndex
        })

        selectedLanguages.setState({
            items: this.state.seletedLanguages.items,
        })
    
        localStorage.setItem('state', JSON.stringify(this.state));
    }

    const searchInput = new SearchInput({
        $target,
        initialState: this.state.suggestions.keyword,
        onChange: async (keyword) => {
            if (keyword.length > 0) {
                const languages = await fetchLanguages(keyword);
                this.setState({ ...this.state, suggestions: { keyword: keyword, items: languages, selectedIndex: 0 }});
            } else {
                this.setState({ ...this.state, suggestions: { keyword: '', items: [], selectedIndex: 0 }, keyword: '' });
            }
        }
    });

    const suggestion = new Suggestion({
        $target,
        initialState: this.state.suggestions,
        onSelect: (item) => {
            alert(item);
            const nextSeletedLanguages = [...this.state.seletedLanguages.items];
            
            //이미 선택된 언어는 맨 뒤로 보내는 처리
            let index = nextSeletedLanguages.findIndex(v => v == item);
            
            if (index > -1) {
                nextSeletedLanguages.splice(index, 1);
            }

            //5개 이상이면 삭제 후 추가
            if (nextSeletedLanguages.length >= 5) {
               nextSeletedLanguages.splice(0, 1);
            }

            nextSeletedLanguages.push(item);
            this.setState({ ...this.state, seletedLanguages: {items: nextSeletedLanguages}});
        }
    });

    const selectedLanguages = new SelectedLanguages({
        $target,
        initialState: this.state.seletedLanguages
    })
}