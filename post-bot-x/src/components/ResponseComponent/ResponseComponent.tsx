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
      if (newHeight > 0) {
        setHeight(newHeight);
      }
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
        height: `${Math.max(height, 20)}px`,
        overflow: height > 20 ? "auto" : "hidden",
        border: "1px solid gray",
        borderRadius: "4px 4px 0 0",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          marginBottom: 20,
        }}
      >
        <Box
          onMouseDown={handleMouseDown}
          sx={{
            height: "20px",
            cursor: "row-resize",
            position: "relative",
            top: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DragHandle sx={{ color: "black", fontSize: 20 }} />
          <IconButton
            onClick={() => setIsVisible(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 0,
              zIndex: 2,
              visibility: height > 50 ? "visible" : "hidden",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </div>
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
