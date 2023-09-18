import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { setProductsPage } from "../../store/actions/productsActions";
interface ISingleListItemProps {
  id: string;
  text: string;
}

export default function SingleListItem({ id, text }: ISingleListItemProps) {
  const dispatch = useAppDispatch();

  const handleCategoryClick = () => {
    dispatch(setProductsPage(1));
  };

  return (
    <ListItem disablePadding onClick={handleCategoryClick}>
      <ListItemButton component={Link} to={`/shop/${id}`}>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
