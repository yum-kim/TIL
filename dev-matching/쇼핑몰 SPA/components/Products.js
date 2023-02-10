export default function Products({ $target, initialState, fetchData, onClickEvent }) {
    this.state = initialState;
    fetchData();
    
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
        this.eventListener();
    }
    
    this.eventListener = () => {
        this.$productWrapper = document.querySelector('.ProductListPage ul');
        this.$productWrapper.addEventListener('click', (ev) => {
            const product = ev.target.closest('.Product');
            const id = product.getAttribute('productId');
            onClickEvent(id);
        });
    }

    this.render = () => {
        $target.innerHTML = `
            <div class="ProductListPage">
                <h1>상품목록</h1>
                <ul>
                    ${this.state.map((item) => (
                        `<li class="Product" productId=${item.id}>
                            <img src="${item.imageUrl}">
                            <div class="Product__info">
                            <div>${item.name}</div>
                            <div>${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원~</div>
                            </div>
                        </li>`
                    )).join('')}
                </ul>
            </div>
        `;
    }
    
    this.render();
}