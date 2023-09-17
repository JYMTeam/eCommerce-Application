import React from "react";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { IParsedCartItem } from "../../../../types";
import { CartRemoveItemButton } from "./CartRemoveItemButton";
import { CartListItemQuantity } from "./CartListItemQuantity";

interface ICartListItemProps {
  data: IParsedCartItem;
}

const LIST_ITEM_BG_COLOR = "background.paper";
const AVATAR_SIZE = 150;
const AVATAR_SIZE_MOBILE = 200;
const NAME_TEXT_MIN_WIDTH = 220;
const PRICE_BOX_MIN_WIDTH = 140;
const TEXT_MR = 0.5;
const PRICE_VARIANT = "body2";
const DISCOUNT_COLOR = "darkgrey";
const DISCOUNT_DECORATION = "line-through";

const lineItemSx = {
  bgcolor: LIST_ITEM_BG_COLOR,
  paddingRight: "1.75rem",
  flexWrap: {
    xs: "wrap",
    sm: "nowrap",
  },
  justifyContent: {
    xs: "center",
    sm: "flex-start",
  },
  gap: "1em",
  paddingTop: {
    xs: "1.5rem",
    sm: "1.5rem",
  },
};

const lineItemContentSx = {
  width: "100%",
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row",
  },
  justifyContent: {
    xs: "center",
    sm: "space-between",
  },
  alignItems: { xs: "center" },
  flexWrap: "wrap",
};

const lineItemAvatarSx = {
  width: {
    xs: AVATAR_SIZE_MOBILE,
    sm: AVATAR_SIZE,
  },
  height: {
    xs: AVATAR_SIZE_MOBILE,
    sm: AVATAR_SIZE,
  },
  mr: 1,
};

const lineItemNameSx = {
  mr: TEXT_MR,
  minWidth: { sm: NAME_TEXT_MIN_WIDTH },
};

const lineItemPriceBoxSx = {
  minWidth: PRICE_BOX_MIN_WIDTH,
  display: "flex",
  flexDirection: "column",
  justifyContent: {
    xs: "center",
    sm: "right",
  },
  alignItems: {
    xs: "center",
    sm: "end",
  },
  flexGrow: "1",
  marginTop: "1.5rem",
};

export default function CartListItem({
  data: { cartArrIndex, name, image, price, discount, totalCost },
}: ICartListItemProps) {
  return (
    <ListItem alignItems="flex-start" sx={lineItemSx}>
      <CartRemoveItemButton cartArrIndex={cartArrIndex} />
      <ListItemAvatar>
        <Avatar
          alt={name}
          src={image}
          variant="rounded"
          sx={lineItemAvatarSx}
        ></Avatar>
      </ListItemAvatar>
      <Box sx={lineItemContentSx}>
        <Box>
          <ListItemText primary={name} sx={lineItemNameSx} />
          <CartListItemQuantity cartArrIndex={cartArrIndex} />
        </Box>
        <Box sx={lineItemPriceBoxSx}>
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
          />
        </Box>
      </Box>
    </ListItem>
  );
}
