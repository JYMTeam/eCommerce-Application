import { AppDispatch } from "..";
import { ErrorResponse, ClientResponse } from "@commercetools/platform-sdk";
import { getApiEntryRoot } from "../../commercetools-sdk/builders/ClientBuilderEntry";
import {
  productsFetching,
  productsFetchSuccess,
  productsFetchError,
  productsPage,
  filterProductsFetchSuccess,
  filterParams,
  filterEmpty,
} from "../slices/productsSlice";
import { DEFAULT_PRODUCTS_LIMIT } from "../../constants/constants";
import { SelectedFilterValues } from "../../components/ProductsList/ProductsAttributes";
import { convertUSDToCents } from "../../utils/utils";

const FILTER_QUERY_ATTRIBUTES_BEGIN = "variants.attributes";
const FILTER_QUERY_PRICE_BEGIN = "variants.price.centAmount";
const FILTER_QUERY_KEY = "key";
const FILTER_PRICE_ATTRIBUTE = "price";

export const fetchProducts = (offset = 0) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(productsFetching());

      const queryArgs = {
        limit: DEFAULT_PRODUCTS_LIMIT,
        offset,
      };

      const answer = await getApiEntryRoot()
        .productProjections()
        .get({ queryArgs })
        .execute();

      dispatch(productsFetchSuccess(answer.body));
    } catch (err) {
      const error = err as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(productsFetchError(body));
      }
    }
  };
};

export const setProductsPage = (page: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(productsPage({ page }));
  };
};

export const setFilterParams = (lists: SelectedFilterValues) => {
  return async (dispatch: AppDispatch) => {
    dispatch(filterParams(lists));
  };
};

export const filterProducts = (
  selectedValues: SelectedFilterValues,
  offset = 0,
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(productsFetching());
      const filterOptions = getFilterOptions(selectedValues);
      const queryArgs = {
        limit: DEFAULT_PRODUCTS_LIMIT,
        offset,
        filter: filterOptions,
      };
      const answer = await getApiEntryRoot()
        .productProjections()
        .search()
        .get({ queryArgs })
        .execute();
      dispatch(filterProductsFetchSuccess(answer.body));
    } catch (e) {
      const error = e as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(productsFetchError(body));
      }
    }
  };
};

export const resetFilterParams = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(filterEmpty());
  };
};

const getFilterOptions = (lists: SelectedFilterValues) => {
  const filterOptions: string[] = [];

  Object.entries(lists).forEach((list) => {
    const [listName, listAttributes] = list;
    const currentKeyList = listName;
    if (listName === FILTER_PRICE_ATTRIBUTE) {
      const [minUSD, maxUSD] = listAttributes;
      const centsMin = convertPriceToCentsString(minUSD);
      const centsMax = convertPriceToCentsString(maxUSD);

      const filterOption = `${FILTER_QUERY_PRICE_BEGIN}:range (${centsMin} to ${centsMax})`;
      filterOptions.push(filterOption);
    } else {
      listAttributes.forEach((attribute) => {
        const filterOption = `${FILTER_QUERY_ATTRIBUTES_BEGIN}.${currentKeyList}.${FILTER_QUERY_KEY}:"${attribute}"`;
        filterOptions.push(filterOption);
      });
    }
  });
  return filterOptions;
};

const convertPriceToCentsString = (usdAmount: string) => {
  const amountAsNumber = parseInt(usdAmount, 10);
  return convertUSDToCents(amountAsNumber).toString();
};
