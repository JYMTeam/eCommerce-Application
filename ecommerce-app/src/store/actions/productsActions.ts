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
  filterCount,
} from "../slices/productsSlice";
import { DEFAULT_PRODUCTS_LIMIT } from "../../constants/constants";
import { convertUSDToCents } from "../../utils/utils";
import { SelectedFilterAndSortValues, SortMethods } from "../../types";

const FILTER_QUERY_ATTRIBUTES_BEGIN = "variants.attributes";
const FILTER_QUERY_PRICE_BEGIN = "variants.price.centAmount";
const FILTER_QUERY_KEY = "key";

type QueryArgs = {
  limit: number;
  offset: number;
  where?: string;
};

export const fetchProducts = (offset = 0, categoryId?: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(productsFetching());

      let queryArgs: QueryArgs = {
        limit: DEFAULT_PRODUCTS_LIMIT,
        offset,
      };
      if (categoryId) {
        queryArgs.where = `categories(id="${categoryId}")`;
      }

      console.log(queryArgs);

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

export const setFilterParams = (lists: SelectedFilterAndSortValues) => {
  return async (dispatch: AppDispatch) => {
    dispatch(filterParams(lists));
  };
};

export const searchProducts = (text: string, offset = 0) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(productsFetching());
      dispatch(filterEmpty());
      let fuzzyLevel = 2;
      const textLength = text.length;

      if (textLength <= 2) {
        fuzzyLevel = 0;
      }

      if (textLength >= 3 && textLength <= 5) {
        fuzzyLevel = 1;
      }

      const queryArgs = {
        limit: DEFAULT_PRODUCTS_LIMIT,
        offset,
        "text.en": text,
        fuzzy: true,
        fuzzyLevel,
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

export const filterAndSortProducts = (
  selectedValues: SelectedFilterAndSortValues,
  offset = 0,
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(productsFetching());
      const queryOptions = getFilterAndSortOptions(selectedValues);
      const queryArgs = {
        limit: DEFAULT_PRODUCTS_LIMIT,
        offset,
        ...queryOptions,
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

export const setFilterCount = (count: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(filterCount(count));
  };
};

const getFilterAndSortOptions = (lists: SelectedFilterAndSortValues) => {
  const { sort, price, otherLists } = lists;
  const filterOptions: string[] = [];
  let sortOptions: string = "";

  if (sort) {
    switch (sort) {
      case SortMethods.PRICE_LOW:
        sortOptions = `price asc`;
        break;
      case SortMethods.PRICE_HIGH:
        sortOptions = `price desc`;
        break;
      case SortMethods.NAME:
        sortOptions = "name.en asc";
        break;
    }
  }

  if (price) {
    const [minUSD, maxUSD] = price;
    const centsMin = convertPriceToCentsString(minUSD);
    const centsMax = convertPriceToCentsString(maxUSD);

    const filterOption = `${FILTER_QUERY_PRICE_BEGIN}:range (${centsMin} to ${centsMax})`;
    filterOptions.push(filterOption);
  }

  if (otherLists) {
    Object.entries(otherLists).forEach((list) => {
      const [listName, listAttributes] = list;
      const currentKeyList = listName;
      const currentParams: string[] = [];

      listAttributes.forEach((attribute) => {
        currentParams.push(`"${attribute}"`);
      });

      const filterOption = `${FILTER_QUERY_ATTRIBUTES_BEGIN}.${currentKeyList}.${FILTER_QUERY_KEY}:${currentParams.join(
        ",",
      )}`;
      filterOptions.push(filterOption);
    });
  }

  const queryOptions: { [key: string]: string[] } = {
    filter: filterOptions,
  };

  if (sortOptions !== "") {
    queryOptions["sort"] = [sortOptions];
  }
  return queryOptions;
};

const convertPriceToCentsString = (usdAmount: number) => {
  return convertUSDToCents(usdAmount).toString();
};

// export const setCategory = (categoryId: string) => {
//   return async (dispatch: AppDispatch) => {
//     dispatch(categorySet(categoryId));
//   };
// };

// export const resetCategory = () => {
//   return async (dispatch: AppDispatch) => {
//     dispatch(categoryReset());
//   };
// };
