import Products from "./components/Products.js";
import DetailedProduct from "./components/DetailedProduct.js";
import Basket from "./components/Basket.js";

export default function App ( $target ) {
    const initialState = {
        products: [],
        detailedProduct: null,
        basket: { carts: [], products: [] }
    }

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        
        if (nextState.products) {
            products.setState(this.state.products);
        }

        if (nextState.detailedProduct) {
            detailedProduct.setState(this.state.detailedProduct);
        }

        if (nextState.basket) {
            basket.setState(this.state.basket);
        }
        
        console.log(this.state)
   }

    const products = new Products({
        $target,
        initialState: this.state.products,
        fetchData: async () => {
            try {
                const res = await fetch('data/data.json');
                const data = await res.json();
                this.setState({ products: data });
                products.setState(this.state.products);
                basket.setState({ ...this.state.basket, products: this.state.products })
            } catch (e) {
                console.log(e);
            }
        },
        onClickEvent: (id) => {
            this.setState({ detailedProduct: { productId: id } });
        }
    })

    const detailedProduct = new DetailedProduct({
        $target,
        currentProduct: this.state.detailedProduct,
        addCart: (cartItems) => {
            this.setState({
                basket: {
                    ...this.state.basket.products, carts: [...this.state.basket.carts, ...cartItems]
                }
            });
        },
        addProductOption: (currentProduct) => {
            let target = this.state.basket.products;
            if (target.length == 0) {
                target = this.state.products;
            }

            const addedOptionsProducts = target.map(el => {
                if (el.id == currentProduct.id) {
                    return {
                        ...el,
                        selectedOptions: currentProduct.productOptions
                    }
                } else {
                    return el;
                }
            });

            basket.setState({ ...this.state.basket, products: addedOptionsProducts });
            console.log(this.state.basket.products);
        }
    })

    const basket = new Basket({
        $target,
        carts: this.state.basket,
        order: () => {
            this.setState({
                ...this.state, detailedProduct: null, basket: { carts: [], products: [] }
            })
            products.setState(this.state.products);
        }
    })

    


}