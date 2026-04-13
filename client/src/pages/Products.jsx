import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Header from "../components/Header";
import ProductListing from "../components/ProductListing";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // this runs every time page or search changes
    // so typing in search or clicking Next auto-refetches
    axiosInstance
      .get(`/products/getAllProducts?page=${page}&search=${search}`)
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  }, [page, search]); // <-- dependency array: re-run when these change

  return (
    <>
      <Header search={search} setSearch={setSearch} setPage={setPage} />
      <ProductListing
        products={products} // real data from DB
        page={page}
        totalPages={totalPages}
        setPage={setPage} // pagination buttons use this
        search={search}
        setSearch={setSearch} // search input uses this
        onProductClick={(id) => navigate(`/products/${id}`)}
      />
    </>
  );
};

export default Products;
