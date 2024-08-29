import { Alert, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { mapJsonToOutput } from "./MapJsonOutput";
import { prettifyJSON } from "../../utils/PrettifyJson";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";

const JSONBody = () => {
  const { formik } = useAPITestFormikContext();
  const [jsonInput, setJsonInput] = useState("");
  const [configuredJson, setConfiguredJson] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleInputChange = (e: any) => {
    setJsonInput(e.target.value);
  };
  const configureJsonObject = (json: string) => {
    try {
      const parsedJson = JSON.parse(json);
      const configuredJson = mapJsonToOutput(parsedJson);
      const configuredStringifyJson = JSON.stringify(configuredJson);
      setErrorMessage("");
      setConfiguredJson(prettifyJSON(configuredStringifyJson));
      formik.setFieldValue(`payload[0]`, prettifyJSON(configuredStringifyJson));
    } catch (error) {
      setErrorMessage("Invalid Json Format");
      console.error(error);
    }
  };
  const handleConfiguredInputChange = (e: any) => {
    setConfiguredJson(prettifyJSON(e.target.value));
    formik.setFieldValue(`payload[0]`, prettifyJSON(e.target.value));
  };

  console.log("configuredJson", configuredJson);
  console.log("Formik", formik.values);

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
            backgroundColor: "green",
            color: "white",
            position: "sticky",
            marginTop: "20px",
            bottom: "0px",
            "&: hover": {
              backgroundColor: "darkgreen",
            },
          }}
          onClick={() => {
            configureJsonObject(jsonInput);
          }}
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
      {errorMessage && (
        <Alert
          sx={{ position: "absolute", bottom: 0, right: 0, margin: "20px" }}
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};

export default JSONBody;
