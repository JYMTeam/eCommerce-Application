import React from "react";
import Stack from "@mui/material/Stack";
import { teamMembersInfo } from "../../constants/constants";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const CARD_MAX_WIDTH = 425;
const CARD_MEDIA_HEIGHT = 250;
const CARD_TITLE_FONTSIZE = 18;
const CARD_DESC_FONTSIZE = 14;
const BUTTON_COLOR = "#F9C152";
const CARD_DESC_MB = 1.5;

export default function AboutUsStack() {
  return (
    <Stack
      direction={{ sm: "column", md: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      sx={{ mb: 2 }}
    >
      {teamMembersInfo.map(
        ({ name, image, role, bio, githubLink, contributionDesc }) => {
          return (
            <Card
              sx={{
                maxWidth: CARD_MAX_WIDTH,
                //boxShadow: CARD_BOX_SHADOW,
                //minHeight: CARD_MIN_HEIGHT,
                //height: CARD_HEIGHT,
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  alignContent: "space-between",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  alt={name as unknown as string}
                  height={CARD_MEDIA_HEIGHT}
                  image={image}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h4"
                    sx={{ fontSize: CARD_TITLE_FONTSIZE }}
                  >
                    {name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: CARD_DESC_MB, fontSize: CARD_DESC_FONTSIZE }}
                  >
                    {role as unknown as string}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: CARD_DESC_MB, fontSize: CARD_DESC_FONTSIZE }}
                  >
                    {bio as unknown as string}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: CARD_DESC_MB, fontSize: CARD_DESC_FONTSIZE }}
                  >
                    {contributionDesc as unknown as string}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "center", width: "100%" }}>
                  <Button
                    component="a"
                    size="small"
                    sx={{ color: BUTTON_COLOR }}
                    href={githubLink}
                    target="_blank"
                  >
                    See github
                  </Button>
                </CardActions>
              </Box>
            </Card>
          );
        },
      )}
    </Stack>
  );
}
