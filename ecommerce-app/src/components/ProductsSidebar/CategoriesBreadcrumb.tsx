import React from "react";
import Link, { LinkProps } from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { SIDEBAR_WIDTH } from "./ProductsSidebar";
import { useAppSelector } from "../../hooks/redux";
import { parseCategoriesBreadcrumb } from "../../utils/dataParsers";
import { IAncestorInfo } from "../../types";
import { PRODUCT_LIST_PADDING } from "../ProductsList/ProductsList";

interface ILinkRouterProps extends LinkProps {
  to: string;
}

function LinkRouter(props: ILinkRouterProps) {
  return <Link {...props} component={RouterLink} />;
}

export default function CategoriesBreadcrumbs() {
  const { id: categoryId } = useParams();
  const { categories } = useAppSelector((state) => state.categories);
  const parsedBreadcrumb = parseCategoriesBreadcrumb(categories);
  let breadcumbPath: IAncestorInfo[] | undefined = [];
  if (categoryId) {
    breadcumbPath = parsedBreadcrumb.get(categoryId);
  }

  return (
    <Box
      sx={{
        ml: {
          md: `${SIDEBAR_WIDTH + PRODUCT_LIST_PADDING * 10}px`,
          xs: `${PRODUCT_LIST_PADDING * 10}px`,
        },
        flexGrow: 1,
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <LinkRouter underline="hover" color="text.primary" to="/">
          Main
        </LinkRouter>
        {breadcumbPath &&
          breadcumbPath.map(({ id, text }, index) => {
            if (!breadcumbPath) return <></>;
            const last = index === breadcumbPath.length - 1;
            return last ? (
              <LinkRouter
                color="text.primary"
                to={`/categories/${id}`}
                key={id}
              >
                {text}
              </LinkRouter>
            ) : (
              <LinkRouter
                underline="hover"
                color="text.primary"
                to={`/categories/${id}`}
                key={id}
              >
                {text}
              </LinkRouter>
            );
          })}
      </Breadcrumbs>
    </Box>
  );
}
