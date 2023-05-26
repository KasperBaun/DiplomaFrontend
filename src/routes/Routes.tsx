import { Routes, Route } from "react-router-dom"
import { ErrorPage } from "@webshop/error/ErrorPage"
import { Webshop } from "@webshop/Webshop"
import { CategoriesPage } from "@webshop/categories/CategoriesPage"
import { HomePage } from "@webshop/home/HomePage"
import { SubcategoriesPage } from "@webshop/subcategory/SubcategoriesPage"
import { BasketPage } from "@webshop/basket/BasketPage"
import { ConfirmationPage } from "@webshop/confirmation/ConfirmationPage"
import { ProductPage } from "@webshop/product/ProductPage"
import { Auth } from "@backoffice/Auth"
import { ProductsPage } from "@webshop/product/ProductsPage"
import { AboutUsPage } from "@webshop/aboutus/AboutUsPage"
import { FAQPage } from "@webshop/faq/FAQPage"
import { ContactPage } from "@webshop/contact/Contact"
import { CheckoutPage } from "@webshop/checkout/CheckoutPage"

export const Routing: React.FC = function Routing() {

    return (
        <Routes>
            <Route path="/backoffice" element={<Auth />} errorElement={<ErrorPage />}>
            </Route>
            <Route path="/" element={<Webshop />} errorElement={<ErrorPage />}>
                <Route path="/" element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="product/:id" element={<ProductPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="categories/subcategories/:id" element={<SubcategoriesPage />} />
                <Route path="basket" element={<BasketPage />} />
                <Route path="confirmation/:id" element={<ConfirmationPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="aboutus" element={<AboutUsPage />} />
                <Route path="faq" element={<FAQPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>

        </Routes >
    );
};
