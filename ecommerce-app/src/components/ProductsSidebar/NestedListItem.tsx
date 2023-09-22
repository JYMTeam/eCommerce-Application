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
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { setProductsPage } from "../../store/actions/productsActions";

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
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const handleCategoryClick = () => {
    dispatch(setProductsPage(1));
    setOpen(!open);
  };

  return (
    <>
      <ListItem disablePadding onClick={handleCategoryClick}>
        <ListItemButton component={Link} to={`/shop/${id}`}>
          <ListItemText primary={text} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="ul" disablePadding>
          {children.map(({ id, text, children }) =>
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
