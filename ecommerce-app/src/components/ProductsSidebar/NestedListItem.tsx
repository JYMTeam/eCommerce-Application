import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import SingleListItem from "./SingleListItem";

interface INestedListItemProps {
  text: string;
  sub: INestedListItemProps[];
}

export default function NestedListItem({ text, sub }: INestedListItemProps) {
  const [open, setOpen] = React.useState(false);

  const handleCategoryClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleCategoryClick}>
          <ListItemText primary={text} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="ul" disablePadding>
          {sub.map(({ text, sub }) =>
            sub.length > 0 ? (
              <NestedListItem key={text} text={text} sub={sub} />
            ) : (
              <SingleListItem key={text} text={text} />
            ),
          )}
        </List>
      </Collapse>
    </>
  );
}
