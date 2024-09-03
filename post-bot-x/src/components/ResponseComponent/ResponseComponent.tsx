import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import post_botX from "../../assets/PostBot_X_image.png";
import ResponseContent from "./ResponseContent";
import { DragHandle } from "@mui/icons-material";

const ResponseComponent: React.FC<{
  response: string;
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

  const resp = {
    testResults: [
      {
        testData:
          '{\n    "name": "Apple MacBook Pro 16",\n    "data": {\n        "year": 2019,\n        "price": 1849.99,\n        "CPU model": "Intel Core i9",\n        "Hard disk size": "1 TB"\n    }\n}',
        description:
          "Positive test case with all fields filled with valid values.",
        statusCode: 200,
        responseContent:
          '{"id":"ff808181918f1dd501918f989ea8007d","name":"Apple MacBook Pro 16","createdAt":"2024-08-26T16:50:29.678+00:00","data":{"year":2019,"price":1849.99,"CPU model":"Intel Core i9","Hard disk size":"1 TB"}}',
        isSuccessful: true,
        errorAnalysis: "",
      },
      {
        testData:
          '{\n    "name": "MacBook",\n    "data": {\n        "year": 2020,\n        "price": 10000,\n        "CPU model": null,\n        "Hard disk size": "512 GB"\n    }\n}',
        description:
          "Negative test case with invalid price value and a null CPU model.",
        statusCode: 200,
        responseContent:
          '{"id":"ff808181918f1dd501918f98a2db007e","name":"MacBook","createdAt":"2024-08-26T16:50:30.760+00:00","data":{"year":2020,"price":10000,"CPU model":null,"Hard disk size":"512 GB"}}',
        isSuccessful: true,
        errorAnalysis: "",
      },
      {
        testData:
          '{\n    "name": "MacBook Pro 16 inches with Touch Bar",\n    "data": {\n        "year": 2018,\n        "price": 9999.99,\n        "CPU model": "AMD Ryzen 9",\n        "Hard disk size": "2 TB"\n    }\n}',
        description:
          "Positive test case with different valid values for each field.",
        statusCode: 200,
        responseContent:
          '{"id":"ff808181918f1dd501918f98a529007f","name":"MacBook Pro 16 inches with Touch Bar","createdAt":"2024-08-26T16:50:31.348+00:00","data":{"year":2018,"price":9999.99,"CPU model":"AMD Ryzen 9","Hard disk size":"2 TB"}}',
        isSuccessful: true,
        errorAnalysis: "",
      },
      {
        testData:
          '{\n    "name": "Mac",\n    "data": {\n        "year": 2023,\n        "price": -100,\n        "CPU model": "Intel Core i7",\n        "Hard disk size": "500 GB"\n    }\n}',
        description: "Negative test case with invalid year and price values.",
        statusCode: 200,
        responseContent:
          '{"id":"ff808181918f1dd501918f98a85c0080","name":"Mac","createdAt":"2024-08-26T16:50:32.165+00:00","data":{"year":2023,"price":-100,"CPU model":"Intel Core i7","Hard disk size":"500 GB"}}',
        isSuccessful: true,
        errorAnalysis: "",
      },
      {
        testData:
          '{\n    "name": "Apple MacBook Pro 16 inches",\n    "data": {\n        "year": 2020,\n        "price": 9999,\n        "CPU model": "",\n        "Hard disk size": "1 TB"\n    }\n}',
        description: "Edge test case with an empty string for CPU model.",
        statusCode: 200,
        responseContent:
          '{"id":"ff808181918f1dd501918f98aa920081","name":"Apple MacBook Pro 16 inches","createdAt":"2024-08-26T16:50:32.734+00:00","data":{"year":2020,"price":9999,"CPU model":"","Hard disk size":"1 TB"}}',
        isSuccessful: true,
        errorAnalysis: "",
      },
    ],
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
      {resp ? (
        <ResponseContent testResults={resp.testResults} />
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
