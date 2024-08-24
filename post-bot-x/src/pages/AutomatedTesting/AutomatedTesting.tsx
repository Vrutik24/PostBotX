import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import {
  APITestingPage,
  BodyContentBox,
  CollectionInfoBox,
  ContentBox,
  HeaderContentBox,
} from "./AutomatedTestingStyle";
import { useState } from "react";
import { Formik, useFormik } from "formik";
import { ArrowDropDown } from "@mui/icons-material";
import { RequestTypeList } from "../../dropdown-list/request-type-list";
import { TestingTypeList } from "../../dropdown-list/testing-type-list";
import APITestingBody from "../../components/APITestingBody/APITestingBody";
// import { useFormikContext } from "../../contexts/APITestFormikContext";
import { useContext } from "react";
import { APITestFormikContext } from "../../contexts/APITestFormikContext";

const AutomatedTesting = () => {
  const [testingMethod, setTestingMethod] = useState<"Automated" | "Manual">(
    "Automated"
  );
  const handleChange = (event: SelectChangeEvent) => {
    setTestingMethod(event.target.value as "Automated" | "Manual");
  };

  const formik = useContext(APITestFormikContext);

  console.log(formik?.formik?.values, "fomrik");

  const formikInitialValues = {
    apiType: "Get",
    url: "",
    payload: "",
    headerPairs: [
      {
        key: "",
        value: "",
      },
    ],
    queryParameters: [
      {
        key: "",
        value: "",
      },
    ],
  };

  const apiTestFormik = useFormik({
    initialValues: formikInitialValues,
    onSubmit: async (values) => {},
  });

  console.log("testingMethod", testingMethod);
  console.log("apiFormik", apiTestFormik.values);

  return (
    <APITestingPage>
      <ContentBox>
        <CollectionInfoBox>
          <Typography>Collection</Typography>
          <FormControl sx={{ width: "150px" }}>
            <Select
              value={testingMethod}
              sx={{
                color: "white",
                border: "1px solid white",
                borderColor: "transparent",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
              onChange={handleChange}
            >
              {TestingTypeList.map((testingType: string) => (
                <MenuItem key={testingType} value={testingType}>
                  {testingType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CollectionInfoBox>
        <HeaderContentBox>
          <Select
            id="apiType"
            name="apiType"
            value={apiTestFormik.values.apiType}
            sx={{
              color: "white",
              borderColor: "transparent",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
            }}
            onChange={apiTestFormik.handleChange}
            IconComponent={(props) => <ArrowDropDown sx={{ color: "white" }} />}
          >
            {RequestTypeList.map((requestType: any) => (
              <MenuItem key={requestType.name} value={requestType.name}>
                {requestType.name}
              </MenuItem>
            ))}
          </Select>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: "white", opacity: 0.3 }}
          />
          <TextField
            id="url"
            name="url"
            placeholder="Enter api url"
            value={apiTestFormik.values.url}
            onChange={apiTestFormik.handleChange}
            onBlur={apiTestFormik.handleBlur}
            fullWidth
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
                letterSpacing: "1px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "transparent", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent", // Border color when focused
                },
              },
            }}
          />
          <Button
            sx={{ backgroundColor: "green", color: "white", width: "100px" }}
          >
            Send
          </Button>
        </HeaderContentBox>
        <BodyContentBox>
          <APITestingBody />
        </BodyContentBox>
      </ContentBox>
    </APITestingPage>
  );
};

export default AutomatedTesting;
