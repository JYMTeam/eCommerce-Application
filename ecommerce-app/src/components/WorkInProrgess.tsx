import React from "react";
import workingGif from "../assets/working.gif";
import { MissingPageTemplate } from "./MissingPageTemplate";
export default function WorkInProgress() {
  const pageData = {
    title: "Come back later!",
    desc: "We are working on this page!",
    img: workingGif,
  };
  return (
    <>
      <MissingPageTemplate
        title={pageData.title}
        desc={pageData.desc}
        img={pageData.img}
      />
    </>
  );

  // <Grid
  //   container
  //   direction="column"
  //   justifyContent="center"
  //   alignItems="center"
  //   height="80vh"
  // >
  //   <Typography variant="h3" component="h2" align="center">
  //     Come back later!
  //   </Typography>
  //   <Typography>We are working on this page!</Typography>
  //   <Box display="flex" justifyContent="center" sx={{ width: "100%" }}>
  //     <Box
  //       component="img"
  //       src={workingGif}
  //       alt={"Work in progress"}
  //       sx={{ height: "auto", maxwidth: "100%" }}
  //     />
  //   </Box>
  //   <Box sx={{ mb: "2em" }}>
  //     <Button component={Link} to="/" variant="contained" color="primary">
  //       Go to Main page
  //     </Button>
  //   </Box>
  // </Grid>
}
