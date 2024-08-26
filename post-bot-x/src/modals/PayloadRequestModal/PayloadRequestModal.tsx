import * as React from "react";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import { Height } from "@mui/icons-material";

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
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto'
};

const PayloadRequestModal = ({
  requestModal,
  setRequestmodal,
}: PayloadRequestModalProps) => {
  const { formik } = useAPITestFormikContext();
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
        <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Request Modal
          </Typography>
          <TextField
            multiline
            // rows={10}
            variant="outlined"
            fullWidth
            value={`${formik.values.payload[requestModal.index]}`}
            onChange={(e) => {
              formik.setFieldValue(`payload.${requestModal.index}`, e.target.value);
            }}
            sx={{
              "& .MuiInputBase-input": {
                color: "black",
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
                  borderColor: "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray",
                },
              },
              overflowY: "auto",
            }}
          />
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            gap={"10px"}
          >
            <Button
              variant="outlined"
              sx={{ color: "#FFA24E", borderColor: "#FFA24E" }}
              onClick={() => setRequestmodal({...requestModal, isOpen: false})}
            >
              Cancel
            </Button>
            <Button variant="contained" color="success" onClick={() => setRequestmodal({...requestModal, isOpen: false})}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PayloadRequestModal;
