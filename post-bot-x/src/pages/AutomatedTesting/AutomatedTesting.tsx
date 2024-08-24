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
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import { useContext } from "react";
import { APITestFormikContext } from "../../contexts/APITestFormikContext";

const AutomatedTesting = () => {
  const { formik, testingMethod, setTestingMethod } = useAPITestFormikContext();
  const handleChange = (event: SelectChangeEvent) => {
    setTestingMethod(event.target.value as "Automated" | "Manual");
  };

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
            value={formik.values.apiType}
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
            onChange={formik.handleChange}
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
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
                letterSpacing: "1px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
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
