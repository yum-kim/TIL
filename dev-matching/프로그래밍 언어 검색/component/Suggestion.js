export default function Suggestion({ $target, initialState, onSelect }) {
    this.state = initialState;
    this.$element = document.querySelector(".Suggestion");

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.renderMatchedItem = (keyword, item) => {
        const regex = new RegExp(keyword, 'gi');
        const matched = item.match(regex);
        return item.replace(regex, `<span class="Suggestion__item--matched"">${matched}</span>`);
    }

    this.render = () => {
        const { items, selectedIndex, keyword } = this.state;
        
        if (items.length > 0) {
            this.$element.style.display = 'block';

            
            this.$element.innerHTML = `
            <ul>
            ${items.map((item, index) => `
                <li data-index="${index}" class="${index === selectedIndex && 'Suggestion__item--selected'}">${this.renderMatchedItem(keyword, item)}</li>
                    `).join('')}
                </ul>
            `
        } else {
            this.$element.style.display = 'none';
            this.$element.innerHTML = '';
        }
    }

    this.render();

    //key event
    window.addEventListener('keyup', (e) => {
        if (this.state.items.length == 0) return;
        
        const { selectedIndex } = this.state;
        const lastIndex = this.state.items.length - 1;
        
        const arrowKeys = ['ArrowUp', 'ArrowDown'];
        let nextIndex = selectedIndex;

        if (arrowKeys.includes(e.key)) {
            if (e.key == 'ArrowUp') {
                nextIndex = selectedIndex == 0 ? lastIndex : nextIndex - 1;
            } else if (e.key == 'ArrowDown') {
                nextIndex = selectedIndex == lastIndex ? 0 : nextIndex + 1;
            }
        } else if (e.key == "Enter") {
            onSelect(this.state.items[this.state.selectedIndex]);
        }
        
        this.setState({
            ...this.state,
            selectedIndex: nextIndex
        })
    });

    //mouse click event
    window.addEventListener('click', (e) => {
        const $li = e.target.closest("li");
        if (!$li) return;

        const { index } = $li.dataset;
        try {
            onSelect(this.state.items[parseInt(index)]);
        } catch (e) {
            alert("잘못 선택했습니다!");
        }
    });
    

}