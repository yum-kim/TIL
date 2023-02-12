import { routeChange } from "../route.js";

export default function CartPage({ $target }) {
    this.state = {
        carts: []
    };

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }

        this.render();
        this.eventListener();
    }

    this.processingCarts = async () => {
        let existingCart = localStorage.getItem('products_cart') || [];
        if (existingCart) existingCart = JSON.parse(existingCart);

        const products = await Promise.all(existingCart.map(async (cart) => {
            let product = [];

            try {
                const res = await fetch(`http://127.0.0.1:5500/data/product${cart.productId}.json`);
                product = await res.json();

                const selectedOption = product.productOptions.find((option) => {
                    return cart.optionId == option.id
                });
    
               return {
                    name: product.name,
                    optionName: selectedOption.name,
                    quantity: cart.quantity,
                    price: (selectedOption.price + product.price) * cart.quantity,
                    imageUrl: product.imageUrl
                }
            } catch (e) {
                console.log(e);
            }
        }));

        this.setState({ carts: products });
    }

    //page 생성 시 localStorage data 확인 후 
    this.processingCarts();

    this.eventListener = () => {
        const orderBtn = document.querySelector(".OrderButton");
        orderBtn.addEventListener("click", (ev) => {
            this.order();
        });
    }

    this.order = () => {
        alert("주문되었습니다.");
        localStorage.removeItem('products_cart');
        this.setState({ carts: [] });
        routeChange('/');
    }

    this.render = () => {
        $target.innerHTML = `
            <div class="CartPage">
                <h1>장바구니</h1>
                <div class="Cart">
                <ul>
                    ${this.state.carts.map((cart) => (
                        `
                        <li class="Cart__item">
                            <img src="${cart.imageUrl}">
                            <div class="Cart__itemDesription">
                                <div>${cart.name} ${cart.optionName} ${cart.quantity}개</div>
                                <div>${(cart.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                            </div>
                        </li>
                        `
                    )).join('')}
                </ul>
                <div class="Cart__totalPrice">
                    총 상품가격 
                    ${this.state.carts.reduce((acc, current) => {
                        return acc += current.price
                    }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    원
                </div>
                <button class="OrderButton">주문하기</button>
                </div>
            </div>
        `;
    }
}