export default function DetailedProduct({ $target, currentProduct, addCart, addProductOption }) {
    this.state = {
        currentProduct,
        selectedOptions: []
    };

    this.setState = async (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        
        if (nextState && nextState.productId) {
            const product = await this.getProductData(nextState.productId);
            this.state.currentProduct = product;
        }

        this.render();
        this.eventListener();
    }

    this.eventListener = () => {
        this.$selectedOptionWrapper = document.querySelector(".ProductDetail__selectedOptions ul");
        this.$selectedOption = document.querySelector(".ProductDetail__info select");
        this.$orderBtn = document.querySelector(".OrderButton");
        this.$selectedOption.addEventListener('change', (ev) => {
            const selectedOption = ev.target.value;
            this.addSelectedOption(selectedOption);
        });
        this.$selectedOptionWrapper.addEventListener('input', (ev) => {
            this.changeQuantity(ev.target);
        });
        this.$orderBtn.addEventListener('click', (ev) => {
            this.addCart();
        })
    }
 
    this.getProductData = async (productId) => {
        try {
            const res = await fetch(`data/product${productId}.json`);
            const data = await res.json();
            return data;
        } catch (e) {
            console.error(e);
        }
    }

    this.addSelectedOption = (selectedOption) => {
        //기존 배열에 새로운 배열값 추가. 이미 있을 경우 리턴
        const item = this.state.selectedOptions.find(el => {
            return el.id == selectedOption
        });
        
        if (!item) { //새로 추가
            const addItem = this.state.currentProduct.productOptions.find(option => {
                return option.id == selectedOption
            });

            if (addItem) {
                this.setState({ selectedOptions: [...this.state.selectedOptions, { ...addItem, totalPrice: addItem.price + this.state.currentProduct.price}] });

                //products 리스트에도 옵션들을 보내줘야함
                addProductOption(this.state.currentProduct);
            }

        }
    }

    this.changeQuantity = (target) => {
        if (target.tagName !== "INPUT") return;

        let count = parseInt(target.value);
        
        const optionId = target.getAttribute('optionId');
        const matchedOption = this.state.selectedOptions.find(op => op.id == optionId);
        
        //TODO: 숫자 이외 값 무시
        const chk = /\d/;
        if (!chk.test(count)) {
            count = 1;
        } else {
            //TODO: option의 stock 넘지 않도록 제한
            if (count < 1) {
                count = 1;
            } else if (count > matchedOption.stock) {
                count = matchedOption.stock;
            }
        }
        
        matchedOption.count = count;
        
        //TODO: 개수 반영해 전체 가격 변경되도록 -> totalPrice 값 변경시키기
        if (matchedOption.price !== 0) { //추가금이 있는 옵션일 때
            matchedOption.totalPrice = (this.state.currentProduct.price + matchedOption.price) * matchedOption.count;
        } else {
            matchedOption.totalPrice = (matchedOption.count * this.state.currentProduct.price);
        }

        this.setState({ selectedOptions: [...this.state.selectedOptions]})
    }

    this.addCart = () => {
        //TODO: localStorage에 아래 형태의 데이터로 상품들을 추가하고, /cart 페이지로 이동합니다.
        
        let cartItems = [];
        let existingCart = localStorage.getItem('products_cart');
        const currentProduct = this.state.selectedOptions.map((op) => {
            return {
                productId: parseInt(this.state.productId),
                optionId: op.id,
                quantity: op.count || 1
            }
        });

        if (existingCart) {
            existingCart = JSON.parse(existingCart);
            cartItems = [...existingCart, ...currentProduct];
        } else {
            cartItems = [...currentProduct];
        }

        localStorage.setItem('products_cart', JSON.stringify(cartItems));
        addCart(cartItems);
    }

    this.render = () => {
        const { currentProduct, selectedOptions } = this.state;

        $target.innerHTML = `
            <div class="ProductDetailPage">
                <h1>커피잔 상품 정보</h1>
                <div class="ProductDetail">
                    <img src=${currentProduct.imageUrl}>
                    <div class="ProductDetail__info">
                        <h2>${currentProduct.name}</h2>
                        <div class="ProductDetail__price">${currentProduct.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원~</div>
                        <select>
                            <option>선택하세요.</option>
                            
                            ${currentProduct.productOptions.map((item) => (
                                `<option value="${item.id}" ${item.stock == 0 ? "disabled" : ''}>
                                    ${item.stock == 0 ? "(품절)" : ""} ${currentProduct.name} ${item.name} ${item.price !== 0 ? `(+${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원)` : ''}
                                </option>`
                            )).join('')}
                        </select>
                        <div class="ProductDetail__selectedOptions">
                        <h3>선택된 상품</h3>
                        <ul>
                            ${selectedOptions.map((item) => (
                                `<li>
                                ${currentProduct.name} ${item.name} ${item.price !== 0 ? `(+${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원)` : ''} <div><input type="number" value="${item.count || 1}" optionId="${item.id}">개</div>
                                </li>`
                            )).join('')}
                        </ul>
                        <div class="ProductDetail__totalPrice">
                        ${(selectedOptions.reduce((acc, current) => {
                            return acc += current.totalPrice
                        }, 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        원</div>
                        <button class="OrderButton">주문하기</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}