import { Routes, Route } from "react-router-dom"
import ErrorPage from "@webshop/error/ErrorPage"
import Webshop from "@webshop/Webshop"
import CategoriesPage from "@webshop/categories/CategoriesPage"
import { FunctionComponent } from "react"
import HomePage from "@webshop/home/HomePage"
import SubcategoriesPage from "@webshop/subcategory/SubcategoriesPage"
import BasketPage from "@webshop/basket/BasketPage"
import ConfirmationPage from "@webshop/confirmation/ConfirmationPage"
import PaymentPage from "@webshop/payment/PaymentPage"
import ProductPage from "@webshop/product/ProductPage"
import SearchPage from "@webshop/search/SearchPage"
import BackOffice from "@backoffice/BackOffice"
import ProductListPage from "@webshop/product/ProductListPage"
import { observer } from "mobx-react-lite"

const Routing: React.FC = observer(function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Webshop />} errorElement={<ErrorPage />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/categories/:number" element={<CategoriesPage />} />

                <Route path="/categories" element={<CategoriesPage />} >
                    <Route path="subcategories/:number" element={<SubcategoriesPage />} />
                    <Route path="subcategories" element={<SubcategoriesPage />} />
                </Route >

                <Route path="basket" element={<BasketPage />} />
                <Route path="confirmation" element={<ConfirmationPage />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="productlistspecific/:id" element={<ProductListPage />} />
                <Route path="product" element={<ProductPage productId={1} />} />
                <Route path="search" element={<SearchPage />} />
            </Route>
            <Route path="/backoffice" element={<BackOffice />}>
            </Route>
        </Routes>
    );
});

export default Routing;

