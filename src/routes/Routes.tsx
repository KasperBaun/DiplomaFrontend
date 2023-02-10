import { Routes, Route, Navigate } from "react-router-dom"
import ErrorPage from "../pages/webshop/error/ErrorPage"
import Webshop from "../pages/webshop/Webshop"
import CategoriesPage from "../pages/webshop/categories/CategoriesPage"
import { FunctionComponent } from "react"
import HomePage from "../pages/webshop/home/HomePage"
import SubcategoriesPage from "../pages/webshop/subcategory/SubcategoriesPage"
import BasketPage from "../pages/webshop/basket/BasketPage"
import ConfirmationPage from "../pages/webshop/confirmation/ConfirmationPage"
import PaymentPage from "../pages/webshop/payment/PaymentPage"
import ProductPage from "../pages/webshop/product/ProductPage"
import SearchPage from "../pages/webshop/search/SearchPage"



const Routing: FunctionComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Webshop />} errorElement={<ErrorPage />}>
                <Route path="/" element={<HomePage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="categories/:number" element={<CategoriesPage />} />
                <Route path="subcategories" element={<SubcategoriesPage />} />
                <Route path="basket" element={<BasketPage />} />
                <Route path="confirmation" element={<ConfirmationPage />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="product" element={<ProductPage />} />
                <Route path="search" element={<SearchPage />} />
            </Route>
        </Routes>
    );
}

export default Routing;


// <Routes>
//             {/** Protected Routes / Admin part */}
//             {/** Wrap all Routes under ProtectedRoutes element */}
//             <Route path="/admin" element={<ProtectedRoutes />} errorElement={<ErrorPage />}>
//                 <Route path="login" element={<InnerContent />} />
//                 {/* <Route path="/" element={<InnerContent />}>
//                <Route path="/" element={<Navigate replace to="dashboard" />} />
//                <Route path="dashboard" element={<Dashboard />} />
//                <Route path="tabs" element={<Tabs props={{ userName: "Bikash web" }} />}>
//                    <Route path="/tabs" element={<Navigate replace to="tab1" />} />
//                    <Route path="tab1" element={<Tab1 />} />
//                    <Route path="tab2" element={<ProtectedRoutes roleRequired="USER" />}>
//                        <Route path="/tabs/tab2" element={<Tab2 />} />
//                    </Route>
//                    <Route path="tab3" element={<Tab3 />} />
//                </Route>
//                <Route path="settings" element={<Settings />} />
//                <Route path="dynamic-form" element={<DynamicForm />} />
//                <Route
//                    path="users"
//                    element={<Users extraItem="test extra item from router" />}
//                />
//                <Route path="users/:userId" element={<SingleUser />} />
//                <Route path="users/new" element={<NewUser />} />
//            </Route> */}
//             </Route>


//             {/** Webshop */}
//             {/** Wrap all Router under Webshop element */}
//             <Route path="/" element={<Webshop />} errorElement={<ErrorPage />}>
//                 <Route path="categories" element={<CategoryPage />} />
//             </Route>





//             {/** Permission denied route */}
//             <Route path="/denied" element={<PermissionDenied />} />
//         </Routes>