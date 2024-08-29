import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ParamsComponent from "../ParamsComponent/ParamsComponent";
import HeadersComponent from "../HeadersComponent/HeadersComponent";
import JSONBody from "../JSONBody/JSONBody";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import ManualParamsComponent from "../ManualParamsComponent/ManualParamsComponent";
import ManualJsonBody from "../ManualJsonBody/ManualJsonBody";

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
      style={{height: '80%'}}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "10px", backgroundColor: "inherit", height: '100%'}}>
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

const APITestingBody = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { testingMethod } = useAPITestFormikContext();
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTab-root": {
              color: "gray",
              "&.Mui-selected": {
                color: "white",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "gray",
            },
          }}
        >
          <Tab label="Params" {...a11yProps(0)} />
          <Tab label="Headers" {...a11yProps(1)} />
          <Tab label="Body" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {testingMethod === "Automated" ? (
          <ParamsComponent />
        ) : (
          <ManualParamsComponent />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <HeadersComponent />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {testingMethod === "Automated" ? <JSONBody /> : <ManualJsonBody />}
      </CustomTabPanel>
    </Box>
  );
};

export default APITestingBody;
