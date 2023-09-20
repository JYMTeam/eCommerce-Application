import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import UserInfo from "./UserInfo/UserInfo";
import UserAddresses from "./UserAddresses/UserAddresses";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import "./UserProfile.css";
import { UserPassword } from "./UserPassword/UserPassword";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "0.8rem",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UserProfile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box className="tabs__header">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="User Profile Navigation"
          color="primary"
          textColor="secondary"
          indicatorColor="secondary"
          centered
          sx={{
            padding: "0",
          }}
        >
          <Tab
            color="secondary"
            icon={isMobile ? <AccountBoxIcon /> : undefined}
            label={!isMobile ? "Personal Information" : ""}
            {...a11yProps(0)}
          />
          <Tab
            icon={isMobile ? <ImportContactsIcon /> : undefined}
            label={!isMobile ? "Addresses" : ""}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <UserInfo />
          <UserPassword />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserAddresses />
      </CustomTabPanel>
    </Box>
  );
}
