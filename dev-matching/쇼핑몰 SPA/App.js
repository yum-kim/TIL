import ProductListPage from "./pages/ProductListPage.js";
import ProductDetailPage from "./pages/productDetailPage.js";
import CartPage from "./pages/CartPage.js";
import { init, routeChange } from "./route.js";

export default function App($target) {
    // route 기능 추가
    this.route = () => {
        const { pathname } = location;

        if (pathname === '/') {
            new ProductListPage({
                $target
            }).render();
        } else if (pathname.indexOf('/products/') === 0) {
            const productId = (pathname.split('/'))[2];
            new ProductDetailPage({
                $target,
                productId: productId,
            }).render();
        } else if (pathname === '/cart') {
            new CartPage({
                $target,
                // carts: this.state.basket,
            }).render();
        }
    }

    init(this.route);
    this.route();
    window.addEventListener('popstate', this.route);
}