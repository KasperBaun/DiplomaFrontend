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

const Routing: FunctionComponent = () => {

    return (
        <Routes>
            <Route path="/" element={<Webshop />} errorElement={<ErrorPage />}>
                <Route path="/" element={<HomePage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="categories/:number" element={<CategoriesPage />} />
                <Route path="subcategories/:id" element={<SubcategoriesPage />} />
                <Route path="subcategories" element={<SubcategoriesPage />} />
                <Route path="basket" element={<BasketPage />} />
                <Route path="confirmation" element={<ConfirmationPage />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="product/:id" element={<ProductPage />} />
                <Route path="productList" element={<ProductListPage />} />
                <Route path="productList/:id" element={<ProductListPage />} />
                <Route path="search" element={<SearchPage />} />
            </Route>
            <Route path="/backoffice" element={<BackOffice />}>
            </Route>
        </Routes>
    );
}

export default Routing;
