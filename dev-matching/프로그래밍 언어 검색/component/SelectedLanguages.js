export default function SelectedLanguages({ $target, initialState }) {
    this.state = initialState;
    this.$element = document.querySelector(".SelectedLanguage");
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }
    
    this.render = () => {
        const { items } = this.state;

        this.$element.innerHTML = `
            <ul>
                ${items.map(item => `
                    <li>${item}</li>
                `).join('')}
            </ul>
        `;
    };
    
    this.render();
}