import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
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
import { ArrowDropDown, Save, Send } from "@mui/icons-material";
import { RequestTypeList } from "../../dropdown-list/request-type-list";
import { TestingTypeList } from "../../dropdown-list/testing-type-list";
import APITestingBody from "../../components/APITestingBody/APITestingBody";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import { APIRequestPayload } from "../../types/APIRequestPayload";
import {
  automatedPostWrite,
  automatedPostRead,
} from "../../api/AutomatedTestService";
import { manualPostWrite, manualPostRead } from "../../api/ManualTestService";
import ResponseComponent from "../../components/ResponseComponent/ResponseComponent";
import { useAPI } from "../../contexts/APIContext";
import getAPIColor from "../../utils/GetAPIColor";
import { useEffect, useState } from "react";

interface AutomatedTestingProps {
  setIsVisible: (isVisible: boolean) => void;
  isVisible: boolean;
}

const AutomatedTesting: React.FC<AutomatedTestingProps> = ({
  setIsVisible,
  isVisible,
}) => {
  const [apiTypeColor, setAPITypeColor] = useState<string>("#73DC8C");
  const {
    formik,
    testingMethod,
    setTestingMethod,
    apiRequestData,
    selectedAPIId,
    collectionName,
    // setAPIRequestTypeName
  } = useAPITestFormikContext();
  const handleChange = (event: SelectChangeEvent) => {
    setTestingMethod(event.target.value as "Automated" | "Manual");
  };

  const { updateAPI } = useAPI();

  const testApi = async () => {
    const apiPayload: APIRequestPayload = {
      apiType: formik.values.apiType,
      url: formik.values.url,
      isAutomated: testingMethod == "Automated" ? true : false,
      payload:
        testingMethod == "Automated"
          ? [formik.values.configuredPayload]
          : formik.values.manualPayload,
      // payload: formik.values.payload,
      queryParameters:
        testingMethod == "Automated"
          ? formik.values.queryParameters
          : formik.values.manualQueryParameters,
      headers: formik.values.headers,
    };
    if (apiPayload.isAutomated) {
      if (["Post", "Patch", "Put"].includes(apiPayload.apiType)) {
        try {
          const results = await automatedPostWrite(apiPayload);
          console.log(results);
        } catch (error) {
          console.error(`Error calling ${apiPayload.apiType} method:`, error);
        }
      } else {
        try {
          const results = await automatedPostRead(apiPayload);
          console.log(results);
        } catch (error) {
          console.error(`Error calling ${apiPayload.apiType} method:`, error);
        }
      }
    } else {
      if (["Post", "Patch", "Put"].includes(apiPayload.apiType)) {
        try {
          const results = await manualPostWrite(apiPayload);
          console.log(results);
        } catch (error) {
          console.error(`Error calling ${apiPayload.apiType} method:`, error);
        }
      } else {
        try {
          const results = await manualPostRead(apiPayload);
          console.log(results);
        } catch (error) {
          console.error(`Error calling ${apiPayload.apiType} method:`, error);
        }
      }
    }
  };

  const updateAPIById = async () => {
    const formPayload = {
      apiType: formik.values.apiType,
      isAutomated: testingMethod == "Automated" ? true : false,
      url: formik.values.url,
      configuredPayload:
        testingMethod == "Automated" ? formik.values.configuredPayload : "",
      payload:
        testingMethod == "Automated"
          ? formik.values.payload
          : formik.values.manualPayload,

      // configuredPayload:
      //   testingMethod == "Automated" ? formik.values.payload[0] : "",
      // payload: testingMethod == "Manual" ? formik.values.payload : [""],
      headers: formik.values.headers,
      queryParameters:
        testingMethod == "Automated"
          ? formik.values.queryParameters
          : formik.values.manualQueryParameters,
    };
    if (selectedAPIId && apiRequestData?.collectionId) {
      const data = await updateAPI(
        selectedAPIId,
        { ...apiRequestData, ...formPayload },
        apiRequestData?.collectionId
      );
    }
  };

  useEffect(() => {
    let apiTypeColor = getAPIColor(formik.values.apiType);
    setAPITypeColor(apiTypeColor);
  }, [formik.values.apiType]);

  return (
    <APITestingPage>
      <ContentBox>
        <CollectionInfoBox>
          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Typography sx={{ color: "gray" }}>{collectionName}</Typography>
            <Typography>/</Typography>
            <Typography>{apiRequestData?.name ? apiRequestData?.name : 'untitled'}</Typography>
          </Box>
          <Box display="flex" alignItems={"center"} gap={"20px"}>
            <Button
              variant="contained"
              size="large"
              color="success"
              endIcon={
                <IconButton sx={{ color: "white" }}>
                  <Save fontSize="small" />
                </IconButton>
              }
              onClick={() => updateAPIById()}
            >
              Save
            </Button>
            <FormControl sx={{ width: "150px" }}>
              <Select
                value={testingMethod}
                sx={{
                  color: "white",
                  border: "1px solid gray",
                  height: "50px",
                  backgroundColor: "transparent",
                  borderRadius: "4px",

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray",
                  },
                }}
                onChange={handleChange}
              >
                {TestingTypeList.map((testingType: string) => {
                  return (
                    <MenuItem key={testingType} value={testingType}>
                      {testingType}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </CollectionInfoBox>
        <HeaderContentBox>
          <Select
            id="apiType"
            name="apiType"
            value={formik.values.apiType}
            sx={{
              color: apiTypeColor,
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
            IconComponent={(props) => (
              <ArrowDropDown sx={{ color: apiTypeColor }} />
            )}
          >
            {RequestTypeList.map((requestType: any) => {
              return (
                <MenuItem
                  key={requestType.name}
                  value={requestType.name}
                  sx={{
                    color: requestType.color,

                    "& .MuiMenuItem-root": {
                      backgroundColor: "gray",
                      borderRadius: "8px",
                      padding: "8px",
                    },
                  }}
                >
                  {requestType.name}
                </MenuItem>
              );
            })}
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
                  borderColor: "transparent",
                },
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
            sx={{
              backgroundColor: "#2E7D32",
              color: "white",
              width: "150px",
              paddingX: "20px",
              "&:hover": {
                backgroundColor: "darkGreen",
              },
            }}
            endIcon={
              <IconButton sx={{ color: "white" }}>
                <Send fontSize="small" />
              </IconButton>
            }
            onClick={() => {
              testApi();
              setIsVisible(true);
            }}
          >
            Send
          </Button>
        </HeaderContentBox>
        <BodyContentBox>
          <APITestingBody />
        </BodyContentBox>
      </ContentBox>

      {isVisible && (
        <ResponseComponent response="" setIsVisible={setIsVisible} />
      )}
    </APITestingPage>
  );
};

export default AutomatedTesting;
