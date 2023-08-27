import React from "react";
import ProductsList from "../components/ProductsList/ProductsList";
import ProductsPagination from "../components/ProductsList/ProductsPagination";
import ProductsAttributes from "../components/ProductsList/ProductsAttributes";

export function ShopPage() {
  //check token after loading
  // const [isFiltered, setFiltered] = useState(false);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const filtration = () => {
  //     if (!isFiltered) {
  //       dispatch(fetchFilterProducts());
  //       setFiltered(true);
  //     }
  //   };
  //   filtration();
  // }, [dispatch, setFiltered, isFiltered]);
  return (
    <>
      <ProductsAttributes />
      <ProductsList />
      <ProductsPagination />
    </>
  );
}
