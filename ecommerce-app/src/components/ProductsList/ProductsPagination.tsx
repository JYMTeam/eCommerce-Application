import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchProducts,
  filterProducts,
  setProductsPage,
} from "../../store/actions/productsActions";
import { Pagination } from "@mui/material";
import "./products.css";

export default function ProductsPagination() {
  const { loading, page, limit, total, errorMessage, filterParams } =
    useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const totalPages = total ? Math.ceil(total / limit) : 0;

  const handleChange = (_: React.ChangeEvent<unknown>, pageNumber: number) => {
    const offset = limit * (pageNumber - 1);
    dispatch(setProductsPage(pageNumber));
    if (filterParams) {
      dispatch(filterProducts(filterParams, offset));
    } else {
      dispatch(fetchProducts(offset));
    }
  };

  return loading || errorMessage ? (
    <div></div>
  ) : (
    <div className="products-pagination">
      <Pagination
        count={totalPages}
        color="primary"
        sx={{ mt: 2, mb: 2 }}
        size="large"
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
