import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import post_botX from "../../assets/PostBot_X_image.png";
import ResponseContent from "./ResponseContent";
import { DragHandle } from "@mui/icons-material";

const ResponseComponent: React.FC<{
  response: [] | null;
  setIsVisible: (visible: boolean) => void;
}> = ({ response, setIsVisible }) => {
  const [height, setHeight] = useState(200);
  const [isDragging, setIsDragging] = useState(false);
  const initialYRef = useRef<number | null>(null);
  const initialHeightRef = useRef<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    initialYRef.current = e.clientY;
    initialHeightRef.current = height;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (
      isDragging &&
      initialYRef.current !== null &&
      initialHeightRef.current !== null
    ) {
      const newHeight =
        initialHeightRef.current + (initialYRef.current - e.clientY);
      const clampedHeight = Math.max(
        20,
        Math.min(newHeight, window.innerHeight)
      );
      setHeight(clampedHeight);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    initialYRef.current = null;
    initialHeightRef.current = null;
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: `${Math.max(height, 40)}px`,
        overflow: height > 150 ? "auto" : "hidden",
        borderRadius: "4px 4px 0 0",
        backgroundColor: "#151414",
      }}
    >
      <Box
        component="div"
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          marginBottom: 2,
          borderTop: "1px solid #3a3939",
          "&:hover": {
            borderTop: "2px solid #4CAF5080", // Change borderTop color on hover
          },
        }}
      >
        <Box
          onMouseDown={handleMouseDown}
          sx={{
            backgroundColor: "#151414",
            height: "40px",
            cursor: "row-resize",
            position: "relative",
            top: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DragHandle sx={{ color: "#4CAF50", fontSize: 20 }} />
          <IconButton
            onClick={() => setIsVisible(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 2,
              visibility: height > 50 ? "visible" : "hidden",
            }}
          >
            <CloseIcon sx={{ color: "#FFFFFF" }} />
          </IconButton>
        </Box>
      </Box>
      {response ? (
        <ResponseContent testResults={response} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <img
            src={post_botX}
            alt=""
            style={{ maxWidth: "100px", marginBottom: "10px" }}
          />
          <p>Click Send to Get Response</p>
        </div>
      )}
    </Box>
  );
};

export default ResponseComponent;
