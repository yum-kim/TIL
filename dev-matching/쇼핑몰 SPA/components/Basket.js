export default function Basket({ $target, carts, order }) {
    this.state = carts;
    this.processedCarts = null;

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }

        if (nextState.products) return;

        this.processedCarts();
        this.render();
        this.eventListener();
    }

    this.processedCarts = () => {
        const data = this.state.carts.map((cart) => {
            const product = this.state.products.find((product) => {
                return cart.productId == product.id;
            });

            const option = product.selectedOptions.find((option) => {
                return cart.optionId == option.id
            });
            
            return {
                name: product.name,
                optionName: option.name,
                quantity: cart.quantity,
                price: (option.price + product.price) * cart.quantity,
                imageUrl: product.imageUrl
            }
        })

        this.processedCarts = data;
    }

    this.eventListener = () => {
        const orderBtn = document.querySelector(".OrderButton");
        orderBtn.addEventListener("click", (ev) => {
            this.order();
        });
    }

    this.order = () => {
        alert("주문되었습니다.");
        localStorage.setItem('products_cart', '');
        order();
    }

    this.render = () => {
        console.log('baskettttt')
        console.log(this.state);

        $target.innerHTML = `
            <div class="CartPage">
                <h1>장바구니</h1>
                <div class="Cart">
                <ul>
                    ${this.processedCarts.map((cart) => (
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
                    ${this.processedCarts.reduce((acc, current) => {
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