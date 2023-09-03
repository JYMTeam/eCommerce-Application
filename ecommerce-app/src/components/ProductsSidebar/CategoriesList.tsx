import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { Toolbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCategories } from "../../store/actions/categoriesActions";
import { parseCategories } from "../../utils/dataParsers";
import SingleListItem from "./SingleListItem";
import NestedListItem from "./NestedListItem";

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
  console.log(parsedCategories);

  const sub = [
    { text: "sub1", sub: [] },
    { text: "sub2", sub: [] },
    { text: "sub3", sub: [{ text: "subsub1", sub: [] }] },
  ];

  return (
    <>
      <Toolbar>
        <Typography variant="h5" noWrap component="h5">
          Categories
        </Typography>
      </Toolbar>
      <Divider />
      <List component="ul">
        {[
          { text: "Inbox", id: 1, sub: [] },
          { text: "Starred", id: 2, sub: sub },
          { text: "Email", id: 3, sub: [] },
          { text: "Drafts", id: 4, sub: sub },
        ].map(({ text, sub }) => {
          return sub.length > 0 ? ( //if a category has sub children
            <NestedListItem key={text} text={text} sub={sub} />
          ) : (
            <SingleListItem key={text} text={text} />
          );
        })}
      </List>
    </>
  );
}
