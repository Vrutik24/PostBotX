import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";

interface RequestModal {
  index: number;
  isOpen: boolean;
  request: string;
}

interface PayloadRequestModalProps {
  requestModal: RequestModal;
  setRequestmodal: (request: RequestModal) => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "rgb(29 28 28)",
  color: "#FFFFFF",
  boxShadow: 24,
  py: 2,
  px: 3,
  border: "none",
  borderRadius: 2,
};

const PayloadRequestModal = ({
  requestModal,
  setRequestmodal,
}: PayloadRequestModalProps) => {
  const { formik } = useAPITestFormikContext();
  const payloadRequestFormik = useFormik({
    initialValues: {
      payload: requestModal.request,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      formik.setFieldValue(
        `manualPayload.${requestModal.index}`,
        values.payload
      );
      setRequestmodal({
        ...requestModal,
        request: payloadRequestFormik.values.payload,
        isOpen: false,
      });
    },
  });

  React.useEffect(() => {
    payloadRequestFormik.setFieldValue("payload", requestModal.request);
  }, [requestModal]);

  return (
    <Modal
      open={requestModal.isOpen}
      onClose={() =>
        setRequestmodal({
          ...requestModal,
          isOpen: false,
        })
      }
    >
      <Box sx={style}>
        <form onSubmit={payloadRequestFormik.handleSubmit}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography>Request Modal</Typography>
            <IconButton
              onClick={() =>
                setRequestmodal({
                  ...requestModal,
                  isOpen: false,
                })
              }
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgb(29 28 28)",
                },
                borderRadius: "8px",
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <TextField
            placeholder='{
                              "id": 1,
                              "name": "Alice",
                              "age": 28 
                           }'
            multiline
            minRows={4}
            maxRows={20}
            variant="outlined"
            fullWidth
            margin="normal"
            id="payload"
            name="payload"
            value={payloadRequestFormik.values.payload}
            onChange={(e) => {
              payloadRequestFormik.setFieldValue("payload", e.target.value);
            }}
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "1px solid #2b2b2b",
                  borderRadius: "8px",
                },
                "&:hover:not(.Mui-focused) fieldset": {
                  borderColor: "#2b2b2b",
                },
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#2b2b2b",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                },
              }}
              onClick={() => {
                setRequestmodal({ ...requestModal, isOpen: false });
                formik.setFieldValue(
                  `manualPayload.${requestModal.index}`,
                  requestModal.request
                );
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "white",
                borderRadius: "8px",
                backgroundColor: "#4CAF50",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#252525",
                  color: "#FFFFFF50",
                },
              }}
              disabled={Boolean(payloadRequestFormik.errors.payload)}
              onClick={() => payloadRequestFormik.handleSubmit()}
            >
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default PayloadRequestModal;
