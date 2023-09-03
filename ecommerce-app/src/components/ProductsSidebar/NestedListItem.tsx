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
  id: string;
  text: string;
  children: INestedListItemProps[];
}

export default function NestedListItem({
  id,
  text,
  children,
}: INestedListItemProps) {
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
          {children.map(({ text, children }) =>
            children.length > 0 ? (
              <NestedListItem
                key={text}
                text={text}
                children={children}
                id={id}
              />
            ) : (
              <SingleListItem key={text} text={text} id={id} />
            ),
          )}
        </List>
      </Collapse>
    </>
  );
}
