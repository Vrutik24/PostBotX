import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
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
import { useEffect, useRef, useState } from "react";
import SelectTestingMethodButton from "../../components/SelectTestingMethodButton/SelectTestingMethodButton";
import { API } from "../../types";

interface AutomatedTestingProps {
  setIsVisible: (isVisible: boolean) => void;
  isVisible: boolean;
}

const AutomatedTesting: React.FC<AutomatedTestingProps> = ({
  setIsVisible,
  isVisible,
}) => {
  const [apiTypeColor, setAPITypeColor] = useState<string>("#73DC8C");
  const [isEditingAPIName, setIsEditingAPIName] = useState(false);
  const inputRef = useRef(null);

  const {
    formik,
    testingMethod,
    setTestingMethod,
    apiRequestData,
    selectedAPIId,
    collectionName,
    apiName,
    setAPIName,
    fetchRequestsForCollections,
  } = useAPITestFormikContext();
  const handleChange = (event: SelectChangeEvent) => {
    setTestingMethod(event.target.value as "Automated" | "Manual");
  };

  const { updateAPI } = useAPI();

  const testApi = async () => {
    await updateAPIById();
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
    if (selectedAPIId && apiRequestData && apiRequestData?.collectionId) {
      apiRequestData.name = apiName ? apiName : "untitled";
      const data = await updateAPI(
        selectedAPIId,
        { ...apiRequestData, ...formPayload },

        apiRequestData?.collectionId
      );
      fetchRequestsForCollections();
    }
  };

  useEffect(() => {
    let apiTypeColor = getAPIColor(formik.values.apiType);
    setAPITypeColor(apiTypeColor);
  }, [formik.values.apiType]);

  const handleAPINameFocus = () => {
    setIsEditingAPIName(true);
  };

  const handleAPINameBlur = () => {
    setIsEditingAPIName(false);
  };

  return (
    <APITestingPage>
      <ContentBox>
        <CollectionInfoBox>
          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Typography sx={{ color: "gray" }}>{collectionName}</Typography>
            <Typography>/</Typography>
            <>
              {isEditingAPIName ? (
                <OutlinedInput
                  autoFocus
                  inputRef={inputRef}
                  value={apiName}
                  sx={{ color: "white", height: "40px" }}
                  onChange={(e) => setAPIName(e.target.value)}
                  onBlur={handleAPINameBlur}
                  fullWidth
                />
              ) : (
                <Typography
                  onClick={handleAPINameFocus}
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    padding: "8px",
                    border: "1px solid transparent",
                  }}
                >
                  {apiName}
                </Typography>
              )}
            </>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={"20px"}>
            <Box display="flex" alignItems={"center"} gap={"20px"}>
              <Button
                variant="contained"
                // size="large"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  // backgroundColor: "#4CAF50",
                  backgroundColor: '#151414',
                  color: "white",
                  width: "100px",
                  margin: "0 10px",
                  "&:hover": {
                    backgroundColor: "#4CAF50",
                  },
                }}
                endIcon={
                  <IconButton sx={{ color: "white" }}>
                    <Save fontSize="small" />
                  </IconButton>
                }
                onClick={() => updateAPIById()}
              >
                Save
              </Button>
              {/* <SelectTestingMethodButton /> */}
            </Box>
            <FormControl sx={{ width: "150px" }}>
              <Select
                value={testingMethod}
                sx={{
                  color: "white",
                  border: "none",
                  height: "50px",
                  backgroundColor: "#151414",
                  borderRadius: "4px",
                  paddingLeft: "10px",
                  "& .MuiSelect-icon": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "#252525",
                      color: "white",
                      width: "150px",
                      "& .MuiMenu-list": {
                        padding: 0,
                      },
                    },
                  },
                }}
                onChange={handleChange}
              >
                {TestingTypeList.map((testingType: string) => (
                  <MenuItem
                    key={testingType}
                    value={testingType}
                    sx={{
                      margin: "10px",
                      padding: "10px",
                      borderRadius: "4px",
                      "&:hover": {
                        backgroundColor: "#383737",
                        color: "white",
                      },
                      "&.Mui-selected, &.Mui-selected:hover, &.Mui-focusVisible":
                        {
                          backgroundColor: "#4CAF50",
                          color: "black",
                        },
                      "&.MuiButtonBase-root": {
                        "&.Mui-selected, &.Mui-selected:hover": {
                          backgroundColor: "#4CAF50", // Ensure this matches the above color
                        },
                      },
                    }}
                  >
                    {testingType}
                  </MenuItem>
                ))}
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
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#252525",
                  color: "white",
                },
              },
            }}
            onChange={formik.handleChange}
            IconComponent={(props) => (
              <ArrowDropDown sx={{ color: apiTypeColor }} />
            )}
          >
            {RequestTypeList.map((requestType: any) => (
              <MenuItem
                key={requestType.name}
                value={requestType.name}
                sx={{
                  color: requestType.color,
                  margin: "10px",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#383737",
                    color: "white",
                  },
                  "&.Mui-selected, &.Mui-selected:hover, &.Mui-focusVisible": {
                    backgroundColor: "#4CAF50",
                    color: "black",
                  },
                  "&.MuiButtonBase-root": {
                    "&.Mui-selected, &.Mui-selected:hover": {
                      backgroundColor: "#4CAF50", // Ensure this matches the above color
                    },
                  },
                }}
              >
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
              backgroundColor: "#4CAF50",
              color: "white",
              width: "100px",
              margin: "0 10px",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
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
