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
import { useEffect, useState } from "react";
import v from "./globalVariables"
import { NotAvailable } from "./pages/not-available/NotAvailable";

export default function App() {
    const [apiAvailable, setapiAvailable] = useState<boolean>(true)

    useEffect(() => {
        // AbortController to cancel fetch request if it takes too long
        const controller = new AbortController()
        const timeout = setTimeout(() => {
            controller.abort()
            setapiAvailable(false)
        }, 5000)
        fetch(v.serverUrl + "apiAvailable", { method: "POST", credentials: "include", mode: "cors", signal: controller.signal }).then((res) => {
            if (res.status === 200) {
                setapiAvailable(true)
            } else {
                setapiAvailable(false)
            }
        })
    }, [])

    return (
        <>
            {apiAvailable ?
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
                :
                <NotAvailable />}
        </>
    )
}