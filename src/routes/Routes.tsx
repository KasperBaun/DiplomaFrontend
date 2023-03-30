import { Routes, Route } from "react-router-dom"
import ErrorPage from "@webshop/error/ErrorPage"
import Webshop from "@webshop/Webshop"
import CategoriesPage from "@webshop/categories/CategoriesPage"
import { FunctionComponent, useContext } from "react"
import HomePage from "@webshop/home/HomePage"
import SubcategoriesPage from "@webshop/subcategory/SubcategoriesPage"
import BasketPage from "@webshop/basket/BasketPage"
import ConfirmationPage from "@webshop/confirmation/ConfirmationPage"
import PaymentPage from "@webshop/payment/PaymentPage"
import ProductPage from "@webshop/product/ProductPage"
import SearchPage from "@webshop/search/SearchPage"
import BackOffice from "@backoffice/BackOffice"
import ProductListPage from "@webshop/product/ProductListPage"
import MobXContext, { IMobXContext } from "@stores/MobXContext"
import { observer } from "mobx-react-lite"
import Loading from "@components/loading/Loading"
import { Constants } from "@utils/Constants"


const Routing: FunctionComponent = observer(() => {
    const { rootStore } = useContext<IMobXContext>(MobXContext);

    if (!rootStore.isLoaded) {
        return (
            <Loading
                size={100}
                color={Constants.primaryColor}
            />
        )
    } else {

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
                    <Route path="product" element={<ProductPage productId={1} />} />
                    <Route path="productList" element={<ProductListPage />} />
                    <Route path="productList/:id" element={<ProductListPage />} />
                    <Route path="search" element={<SearchPage />} />
                </Route>
                <Route path="/backoffice" element={<BackOffice />}>
                </Route>
            </Routes>
        );
    }
});

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