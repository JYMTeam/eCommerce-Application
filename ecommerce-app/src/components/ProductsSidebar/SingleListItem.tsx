import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
interface ISingleListItemProps {
  id: string;
  text: string;
}

export default function SingleListItem({ id, text }: ISingleListItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={`/shop/${id}`}>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
