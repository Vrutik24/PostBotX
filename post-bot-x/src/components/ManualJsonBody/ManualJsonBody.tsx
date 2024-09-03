import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import { Delete, AddCircle, Edit } from "@mui/icons-material";
import { useState } from "react";
import PayloadRequestModal from "../../modals/PayloadRequestModal/PayloadRequestModal";

interface requestModalProps {
  index: number;
  isOpen: boolean;
  request: string;
}

const ManualJsonBody = () => {
  const [requestModal, setRequestmodal] = useState<requestModalProps>({
    index: 0,
    isOpen: false,
    request: "",
  });
  const { formik } = useAPITestFormikContext();

  console.log("requestModal", requestModal)

  const deleteJsonBody = (index: number) => {
    const newJsonBodyArray = formik.values.manualPayload.filter(
      (payload: string, payloadIndex) => payloadIndex !== index
    );
    formik.setFieldValue("manualPayload", newJsonBodyArray);
  };

  const addNewPayload = (index: number) => {
    formik.setFieldValue("manualPayload", [...formik.values.manualPayload, formik.values.manualPayload[index]]);
  };

  const viewAndEditRequest = (index: number, request: string) => {
    console.log("Request++++++++++++++++", request)
    setRequestmodal({
      index: index,
      isOpen: true,
      request: request,
    });
  };

  console.log("requestModal", requestModal)

  return (
    <Box>
      {formik.values.manualPayload.map((payload: string, index: number) => (
        <Box key={index} display={"flex"} gap={"40px"} marginTop={"30px"}>
          <Typography color={"gray"} width={"200px"}>
            Request {index + 1}
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
            width={"100%"}
            position={"relative"}
          >
            <TextField
              multiline
              rows={10}
              variant="outlined"
              fullWidth
              value={payload}
              onChange={(e) => {
                formik.setFieldValue(`manualPayload.${index}`, e.target.value);
              }}
              placeholder='{
                              "id": 1,
                              "name": "Alice",
                              "age": 28 
                           }'
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
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "gray",
                  },
                },
                overflowY: "auto",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      paddingTop: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    <IconButton
                      sx={{ color: "white" }}
                      size="small"
                      onClick={() => viewAndEditRequest(index, payload)}
                    >
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {index === formik.values.manualPayload.length - 1 && (
              <Button
                variant="contained"
                color="success"
                sx={{ width: "100px" }}
                endIcon={<AddCircle />}
                onClick={() => addNewPayload(index)}
              >
                Add
              </Button>
            )}
          </Box>
          {formik.values.manualPayload.length > 1 && (
            <IconButton
              sx={{ color: "gray" }}
              size="small"
              onClick={() => deleteJsonBody(index)}
            >
              <Delete />
            </IconButton>
          )}
        </Box>
      ))}
      <PayloadRequestModal requestModal = {requestModal} setRequestmodal = {setRequestmodal}/>
    </Box>
  );
};

export default ManualJsonBody;
