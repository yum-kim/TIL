export default function SearchInput({ $target, initialState, onChange }) {
    this.state = initialState;

    this.$element = document.querySelector(".SearchInput");
    this.render = () => {
        this.$element.innerHTML = `
        <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value=${this.state}>
        `;
        document.querySelector('.SearchInput__input').focus();
    }
    
    this.render();

    //evnet handler
    this.$element.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    
    this.$element.addEventListener('keyup', (e) => {
        const eventIgnoreKeys = ['Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        if (eventIgnoreKeys.includes(e.key)) return;
        
        const handleDebounce = debounce(() => {
            onChange(e.target.value);
        }, 500);

        handleDebounce();
    });

    const debounce = (callback, limit) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                callback(args);
            }, limit);
        }
    }
}