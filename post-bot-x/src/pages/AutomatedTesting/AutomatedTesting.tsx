import {
  Box,
  Button,
  CircularProgress,
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
import { ArrowDropDown, CancelScheduleSend, Save, Send } from "@mui/icons-material";
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
import axios, { CancelTokenSource } from "axios";

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
  const [isUpdatingAPI, setIsUpdatingAPI] = useState<boolean>(false);
  const [isTestingAPI, setIsTestingAPI] = useState<boolean>(false);
  const [responseData, setResponseData] = useState(null);
  const inputRef = useRef(null);
  const cancelTokenSourceRef = useRef<CancelTokenSource | null>(null);

  const {
    formik,
    testingMethod,
    setTestingMethod,
    apiRequestData,
    selectedAPIId,
    currentCollection,
    apiName,
    setAPIName,
    fetchRequestsForCollections,
  } = useAPITestFormikContext();
  const handleChange = (event: SelectChangeEvent) => {
    setTestingMethod(event.target.value as "Automated" | "Manual");
  };

  const { updateAPI } = useAPI();

  const testApi = async () => {
    setResponseData(null);
    await updateAPIById();
    const isAutomated = testingMethod === "Automated";
    const isWriteMethod = ["Post", "Patch", "Put"].includes(
      formik.values.apiType
    );
    const apiPayload: APIRequestPayload = {
      apiType: formik.values.apiType,
      url: formik.values.url,
      isAutomated: testingMethod == "Automated" ? true : false,
      payload:
        testingMethod == "Automated"
          ? [formik.values.configuredPayload]
          : formik.values.manualPayload,
      queryParameters:
        testingMethod == "Automated"
          ? formik.values.queryParameters
          : formik.values.manualQueryParameters,
      headers: formik.values.headers,
    };

    const cancelTokenSource = axios.CancelToken.source();
    cancelTokenSourceRef.current = cancelTokenSource;

    const executeApiCall = isAutomated
      ? isWriteMethod
        ? automatedPostWrite
        : automatedPostRead
      : isWriteMethod
      ? manualPostWrite
      : manualPostRead;

    try {
      setIsTestingAPI(true);
      const results = await executeApiCall(apiPayload, cancelTokenSource.token);
      setIsVisible(true);
      setResponseData(results);

    } catch (error) {
      console.error(`Error calling ${apiPayload.apiType} method:`, error);
    } finally {
      setIsTestingAPI(false);
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
      headers: formik.values.headers,
      queryParameters:
        testingMethod == "Automated"
          ? formik.values.queryParameters
          : formik.values.manualQueryParameters,
    };
    if (selectedAPIId && apiRequestData && apiRequestData?.collectionId) {
      apiRequestData.name = apiName ? apiName : "untitled";
      try {
        setIsUpdatingAPI(true);
        const data = await updateAPI(
          selectedAPIId,
          { ...apiRequestData, ...formPayload },
          apiRequestData?.collectionId
        );
      } catch (error) {
        console.error("Error updating api!");
      } finally {
        setIsUpdatingAPI(false);
      }
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

  const cancelRequest = () => {
    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel("API request canceled by the user.");
    }
  };

  return (
    <APITestingPage>
      <ContentBox>
        <CollectionInfoBox>
          <Box display={"flex"} alignItems={"center"} gap={"10px"} width={'60%'}>
            <Typography sx={{ color: "gray" }}>{currentCollection?.name || "Collection"}</Typography>
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
          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Box display="flex" alignItems={"center"} gap={"20px"}>
              <Button
                variant="contained"
                // size="large"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  backgroundColor: "#151414",
                  color: "white",
                  width: "100px",
                  margin: "0 10px",
                  "&:hover": {
                    backgroundColor: "#4CAF50",
                  },
                  "&.Mui-disabled": {
                    color: "gray",
                  },
                }}
                endIcon={
                  isUpdatingAPI ? (
                    <CircularProgress size={12} sx={{ color: "white" }} />
                  ) : (
                    <IconButton sx={{ color: "white" }}>
                      <Save fontSize="small" />
                    </IconButton>
                  )
                }
                disabled={isUpdatingAPI}
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
              textTransform: "uppercase",
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
                  textTransform: "uppercase",
                  "&:hover": {
                    backgroundColor: "#38373790",
                  },
                  "&.Mui-selected, &.Mui-selected:hover, &.Mui-focusVisible": {
                    backgroundColor: "#383737",
                  },
                  "&.MuiButtonBase-root": {
                    "&.Mui-selected, &.Mui-selected:hover": {
                      backgroundColor: "#383737",
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
          {isTestingAPI ? (
            <Button
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                width: "fit-content",
                paddingX: "20px",
                margin: "0 10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
              onClick={() => {
                cancelRequest();
              }}
              endIcon={<CancelScheduleSend />}
            >
              Cancel
            </Button>
          ) : (
            <Button
              sx={{
                backgroundColor: "#4CAF50",
                color: "white",
                width: "100px",
                paddingX: "20px",
                margin: "0 10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
                "&.Mui-disabled": {
                  color: "green",
                },
              }}
              onClick={() => {
                testApi();
              }}
              endIcon={<Send />}
            >
              Send
            </Button>
          )}
        </HeaderContentBox>
        <BodyContentBox>
          <APITestingBody />
        </BodyContentBox>
      </ContentBox>

      {isVisible && (
        <ResponseComponent response={responseData} setIsVisible={setIsVisible} />
      )}
    </APITestingPage>
  );
};

export default AutomatedTesting;
