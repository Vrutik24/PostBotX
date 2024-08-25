import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import { Delete, AddCircle } from "@mui/icons-material";

const ManualJsonBody = () => {
  const { formik } = useAPITestFormikContext();

  const deleteJsonBody = (index: number) => {
    const newJsonBodyArray = formik.values.payload.filter(
      (payload: string, payloadIndex) => payloadIndex !== index
    );
    formik.setFieldValue("payload", newJsonBodyArray);
  };

  const addNewPayload = () => {
    formik.setFieldValue("payload", [...formik.values.payload, ""])
  }

  return (
    <Box >
      {formik.values.payload.map((payload: string, index: number) => (
        <Box key={index} display={"flex"} gap={"40px"} marginTop={"30px"}>
          <Typography color={"gray"} width={"200px"}>
            Request {index + 1}
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
            width={"100%"}
          >
            <TextField
              multiline
              rows={10}
              variant="outlined"
              fullWidth
              value={payload}
              onChange={(e) => {
                formik.setFieldValue(`payload.${index}`, e.target.value);
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
            />
            {index === formik.values.payload.length - 1 && (
              <Button
                variant="contained"
                color="success"
                sx={{ width: "100px" }}
                endIcon={<AddCircle />}
                onClick={() => addNewPayload()}
              >
                Add
              </Button>
            )}
          </Box>
          {formik.values.payload.length > 1 && (
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
    </Box>
  );
};

export default ManualJsonBody;
