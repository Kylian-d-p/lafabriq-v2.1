import { Route, Routes } from "react-router-dom";
import HeadBar from "./components/navbar/Navbar";
import HomePage from "./pages/homepage/HomePage";
import Products from "./pages/products/Products";
import Product from "./pages/product/Product";
import APropos from "./pages/a-propos/APropos";
import Footer from "./components/footer/Footer";
import NotFound from "./pages/not-found/NotFound";
import AdminIndex from "./pages/admin/admin-index/AdminIndex";
import Create from "./pages/admin/create/Create";
import Edit from "./pages/admin/edit/Edit";
import AdminNav from "./pages/admin/components/admin-nav/AdminNav";
import EditProduct from "./pages/admin/edit-product/EditProduct";

export default function App() {

    return (
        <>
            <HeadBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path={"/boutique/:category"} element={<Products />} />
                <Route path="/produit/:id" element={<Product />} />
                <Route path="/a-propos" element={<APropos />} />
                <Route path="/admin-lf" element={<AdminIndex />} />
                <Route path="/admin-lf/menu" element={<AdminNav />}>
                    <Route path="/admin-lf/menu/nouvel-article" element={<Create />} />
                    <Route path="/admin-lf/menu/modifier" element={<Edit />} />
                    <Route path="/admin-lf/menu/modifier/:id" element={<EditProduct />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    )
}