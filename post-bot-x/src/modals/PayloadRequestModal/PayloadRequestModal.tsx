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
import { Close, Height } from "@mui/icons-material";
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
  width: 700,
  maxHeight: '100vh',
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
      formik.setFieldValue(`payload.${requestModal.index}`, values.payload);
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

  console.log("payloadRequestFormik", payloadRequestFormik.initialValues);

  return (
    <Modal
      open={requestModal.isOpen}
      onClose={() =>
        setRequestmodal({
          ...requestModal,
          isOpen: false,
        })
      }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
          position={"relative"}
          height={"100%"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Request Modal
            </Typography>
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
              <Close fontSize="small" />
            </IconButton>
          </Box>
          <TextField
            multiline
            minRows={4}
            maxRows={20}
            variant="outlined"
            fullWidth
            id="payload"
            name="payload"
            value={payloadRequestFormik.values.payload}
            onChange={(e) => {
              payloadRequestFormik.setFieldValue("payload", e.target.value);
            }}
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
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
              overflowY: "auto",
              mt:'10px',
              mb: '40px'
            }}
          />
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            gap={"10px"}
            position={"absolute"}
            bottom={0}
            width={"100%"}
          >
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "rgb(29 28 28)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                },
              }}
              onClick={() =>
                setRequestmodal({ ...requestModal, isOpen: false })
              }
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "white",
                borderRadius: "8px",
                backgroundColor:"rgb(29 28 28)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
              onClick={() => payloadRequestFormik.handleSubmit()}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PayloadRequestModal;
