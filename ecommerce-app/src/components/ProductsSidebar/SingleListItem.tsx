import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

interface ISingleListItemProps {
  id: string;
  text: string;
}

export default function SingleListItem({ id, text }: ISingleListItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
