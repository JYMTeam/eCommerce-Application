import React from "react";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { IParsedCartItem } from "../../../types";
import { CartRemoveItemButton } from "./CartRemoveItemButton";

interface ICartListItemProps {
  data: IParsedCartItem;
}

const LIST_ITEM_BG_COLOR = "background.paper";
const AVATAR_SIZE = 100;
const NAME_TEXT_MIN_WIDTH = 220;
const PRICE_BOX_MIN_WIDTH = 140;
const TEXT_MR = 0.5;
const PRICE_VARIANT = "body2";
const DISCOUNT_COLOR = "darkgrey";
const DISCOUNT_DECORATION = "line-through";

export default function CartListItem({
  data: { cartArrIndex, name, image, quantity, price, discount, totalCost },
}: ICartListItemProps) {
  return (
    <ListItem alignItems="flex-start" sx={{ bgcolor: LIST_ITEM_BG_COLOR }}>
      <ListItemAvatar>
        <Avatar
          alt={name}
          src={image}
          variant="rounded"
          sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, mr: 1 }}
        ></Avatar>
      </ListItemAvatar>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <ListItemText
          primary={name}
          secondary={quantity}
          sx={{ mr: TEXT_MR, minWidth: { sm: NAME_TEXT_MIN_WIDTH } }}
        />
        <Box
          sx={{
            minWidth: PRICE_BOX_MIN_WIDTH,
            display: "flex",
            flexDirection: "column",
            justifyContent: "right",
            alignItems: "end",
          }}
        >
          <CartRemoveItemButton cartArrIndex={cartArrIndex} />
          <ListItemText
            primary={
              <Box>
                <Typography
                  component="span"
                  sx={{ display: "inline", mr: TEXT_MR }}
                  variant={PRICE_VARIANT}
                >
                  {discount ? discount : price}
                </Typography>
                <Typography
                  sx={{ textDecoration: DISCOUNT_DECORATION }}
                  component="span"
                  variant={PRICE_VARIANT}
                  color={DISCOUNT_COLOR}
                >
                  {discount ? price : discount}
                </Typography>
              </Box>
            }
          />
          <ListItemText
            primary={
              <Box>
                <Typography
                  component="span"
                  variant={PRICE_VARIANT}
                  sx={{ mr: TEXT_MR }}
                >
                  Total:
                </Typography>
                <Typography component="span">{totalCost}</Typography>
              </Box>
            }
          ></ListItemText>
        </Box>
      </Box>
    </ListItem>
  );
}
