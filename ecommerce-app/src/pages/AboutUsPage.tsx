import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Footer from "../components/Footer/Footer";
import AboutUsStack from "../components/AboutUsStack/AboutUsStack";

const aboutUsBoxSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const aboutUsHeaderSx = {
  mb: 2,
  textAlign: "center",
  textTransform: "uppercase",
};

const aboutUsTextSx = {
  mb: 2,
  padding: 0.5,
  textAlign: "justify",
  lineHeight: 1.83,
  marginBottom: "2rem",
};

export function AboutUsPage() {
  return (
    <>
      <Container>
        <Box component={"main"} sx={aboutUsBoxSx}>
          <Typography variant="h6" component="h2" sx={aboutUsHeaderSx}>
            Meet the JYMTeam
          </Typography>
          <Typography variant="body2" component="p" sx={aboutUsTextSx}>
            The JYMTeam was started in 2023 when three girls decided to unite
            and work together on the eCommerce site you are currently visiting.
            The site is powered by{" "}
            <a
              href="https://docs.commercetools.com/docs/"
              target="_blank"
              className="redirect-link"
              rel="noreferrer"
            >
              CommerceTools
            </a>
            , a leading provider of commerce solutions for B2C and B2B
            enterprises. We chose{" "}
            <a
              href="https://www.atlassian.com/software/jira/guides/getting-started/basics#step-1-create-a-project"
              target="_blank"
              className="redirect-link"
              rel="noreferrer"
            >
              Jira
            </a>{" "}
            to manage our Scrum project. It helped us a lot with tasks
            distribution and tracking in each sprint. To speed up the
            development process, the site was developed using the React library.
            But the main secret of our collaboration was mutual support,
            discussion and active participation of each team member.
          </Typography>
          <AboutUsStack />
        </Box>
        <Footer></Footer>
      </Container>
    </>
  );
}
