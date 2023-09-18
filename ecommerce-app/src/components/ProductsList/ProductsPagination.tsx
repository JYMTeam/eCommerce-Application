import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchProducts,
  filterAndSortProducts,
  setProductsPage,
} from "../../store/actions/productsActions";
import { Pagination } from "@mui/material";
import "./products.css";
import { useParams } from "react-router-dom";

export default function ProductsPagination() {
  const { errorMessage, loading, page, limit, total, filterParams } =
    useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const totalPages = total ? Math.ceil(total / limit) : 0;
  const { id: categoryId } = useParams();

  const handleChange = (_: React.ChangeEvent<unknown>, pageNumber: number) => {
    const offset = limit * (pageNumber - 1);

    dispatch(setProductsPage(pageNumber));

    if (filterParams) {
      dispatch(filterAndSortProducts(filterParams, offset, categoryId));
    } else {
      dispatch(fetchProducts(offset, categoryId));
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
