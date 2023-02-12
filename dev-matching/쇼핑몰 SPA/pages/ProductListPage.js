import { routeChange } from "../route.js";

export default function ProductListPage({ $target }) {
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
        this.eventListener();
    }

    const fetchData = async () => {
        const res = await fetch('http://127.0.0.1:5500/data/data.json');
        const data = await res.json();
        this.setState(data);
    }
    
    //page 생성 시 productList API 요청 처리
    fetchData();
    
    this.eventListener = () => {
        this.$productWrapper = document.querySelector('.ProductListPage ul');
        this.$productWrapper.addEventListener('click', (ev) => {
            const product = ev.target.closest('.Product');
            const productId = product.getAttribute('productId');
            if (productId) {
                routeChange(`/products/${productId}`);
            }
        });
    }

    this.render = () => {
        if (!this.state) return;

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
}