import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { Toolbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCategories } from "../../store/actions/categoriesActions";
import { parseCategories } from "../../utils/dataParsers";
import SingleListItem from "./SingleListItem";
import NestedListItem from "./NestedListItem";
import { IParsedCategory } from "../../types";

export default function CategoriesList() {
  const dispatch = useAppDispatch();
  const { errorMessage, categories } = useAppSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }

  const parsedCategories = parseCategories(categories);

  return (
    <>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ textTransform: "uppercase" }}
          noWrap
          component="h5"
        >
          Categories
        </Typography>
      </Toolbar>
      <Divider />
      <List component="ul">
        {parsedCategories.map(({ id, text, children }: IParsedCategory) => {
          return children.length > 0 ? ( //if a category has sub children
            <NestedListItem
              key={text}
              text={text}
              children={children}
              id={id}
            />
          ) : (
            <SingleListItem key={text} text={text} id={id} />
          );
        })}
      </List>
    </>
  );
}
