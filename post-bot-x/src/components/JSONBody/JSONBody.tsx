import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { mapJsonToOutput } from "./MapJsonOutput";
import { prettifyJSON } from "../../utils/PrettifyJson";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import CallSnackbar from "../../contexts/CallSnackbar";

const JSONBody = () => {
  const { formik } = useAPITestFormikContext();
  const [jsonInput, setJsonInput] = useState(formik.values.payload[0]);
  const [configuredJson, setConfiguredJson] = useState(
    formik.values.configuredPayload
  );
  const snackbar = CallSnackbar();

  const handleInputChange = (e: any) => {
    const updatedJson = e.target.value;
    if (!updatedJson || updatedJson.trim() == "") {
      setConfiguredJson("");
      formik.setFieldValue(`configuredPayload`, "");
    }
    setJsonInput(updatedJson);
    formik.setFieldValue(`payload[0]`, updatedJson);
  };
  const configureJsonObject = (json: string) => {
    try {
      const parsedJson = JSON.parse(json);
      const configuredJson = mapJsonToOutput(parsedJson);
      const configuredStringifyJson = JSON.stringify(configuredJson, null, 2);
      setConfiguredJson(configuredStringifyJson);
      formik.setFieldValue(`configuredPayload`, configuredStringifyJson);
    } catch (error) {
      setConfiguredJson("");
      snackbar.error("Please enter valid Json object!")
      formik.setFieldValue(`configuredPayload`, "");
      console.error(error);
    }
  };
  const handleConfiguredInputChange = (e: any) => {
    setConfiguredJson(prettifyJSON(e.target.value));
    formik.setFieldValue(`configuredPayload`, prettifyJSON(e.target.value));
  };

  useEffect(() => {
    setJsonInput(formik.values.payload[0]);
    setConfiguredJson(formik.values.configuredPayload);
  }, [formik]);

  return (
    <Box display={"flex"} height={"100%"}>
      <Box
        sx={{
          height: "100%",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          borderRight: "0.5px solid gray",
          padding: "20px",
        }}
      >
        <TextField
          multiline
          variant="outlined"
          fullWidth
          maxRows={18}
          value={jsonInput}
          onChange={handleInputChange}
          placeholder='{"key": "value"}'
          sx={{
            "& .MuiInputBase-input": {
              color: "rgba(255, 255, 255, 0.87)",
              fontSize: "14px",
              fontWeight: "100",
              letterSpacing: "2px",
              opacity: 1,
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
          variant="contained"
          sx={{
            backgroundColor: "#4CAF50",
            color: "white",
            position: "sticky",
            marginTop: "20px",
            bottom: "0px",
            "&: hover": {
              backgroundColor: "darkgreen",
            },
            "&.Mui-disabled": {
              backgroundColor: "#1D1C1C",
              color: "#808080",
            },
          }}
          onClick={() => {
            if (jsonInput) {
              configureJsonObject(jsonInput);
            }
          }}
          disabled={jsonInput.trim() == "" || !jsonInput}
        >
          Configure Json Object
        </Button>
      </Box>
      <Box
        sx={{
          height: "100%",
          width: "50%",
          padding: "20px",
          color: "white",
        }}
      >
        <TextField
          multiline
          variant="outlined"
          fullWidth
          maxRows={20}
          value={configuredJson}
          onChange={handleConfiguredInputChange}
          placeholder='{"key": "value"}'
          sx={{
            "& .MuiInputBase-input": {
              color: "rgba(255, 255, 255, 0.87)",
              fontSize: "14px",
              fontWeight: "100",
              letterSpacing: "2px",
              opacity: 1,
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
      </Box>
    </Box>
  );
};

export default JSONBody;
