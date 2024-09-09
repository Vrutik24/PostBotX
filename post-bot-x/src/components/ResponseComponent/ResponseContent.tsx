import React, { useState } from "react";
import "./ResponseComponent.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import post_botX from "../../assets/PostBot_X_image.png";
import { Title } from "./ResponseContentStyle";
import { Box, Button, CircularProgress } from "@mui/material";

interface TestResult {
  testData: string;
  description: string;
  statusCode: number;
  responseContent: string;
  isSuccessful: boolean;
  errorAnalysis: string;
  time: string;
}

interface ResponseComponentProps {
  testResults: TestResult[];
}

const ResponseComponent: React.FC<ResponseComponentProps> = ({
  testResults,
}) => {
  const [isDownLoading, setIsDownloading] = useState(false);

  const flattenObject = (obj: any) => {
    return obj.testResults;
  };

  const isJSON = (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const flattenedResults = flattenObject(testResults);

  const downloadPDF = async () => {
    setIsDownloading(true);
    const element = document.getElementById("response-content");
    if (!element) return;
    const canvas = await html2canvas(element, {
      scale: 2, 
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.5);

    // Calculate the width and height based on the canvas size
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width*0.8 , canvas.height],
    });

    // Adjust the width and height to fit the PDF properly
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("TestResults.pdf");
    setIsDownloading(false);
  };
  
  const parseTime = (timeString: string): string => {
    const [hours, minutes, seconds] = timeString.split(':');
    
    const [secs, millis] = seconds.split('.');
  
    const totalSeconds = (parseInt(hours) || 0) * 3600 
                       + (parseInt(minutes) || 0) * 60 
                       + (parseInt(secs) || 0);
  
    const totalMilliseconds = totalSeconds * 1000 + (parseInt(millis) || 0);
    const formattedMilliseconds = totalMilliseconds.toString().slice(0, 3);
  
    console.log(totalMilliseconds, totalSeconds);
    
    if (totalSeconds < 1) {
      return `${formattedMilliseconds}ms`;
    } else {
      const formattedSeconds = (totalSeconds + (parseInt(millis) || 0) / 10000000).toFixed(2);
      return `${formattedSeconds}s`;
    }
  };

  return (
    <div className="response-container">
      <Button
        onClick={downloadPDF}
        variant="contained"
        disabled={isDownLoading}
        sx={{
          color: "white",
          borderRadius: "8px",
          backgroundColor: "#4CAF50",
          "&:hover": {
            backgroundColor: "darkgreen",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgb(29 28 28)",
            color: "#FFFFFF50",
          },
        }}
      >
        {isDownLoading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Download Report"
            )}
      </Button>
      <div className="response-content" id="response-content">
        <Box display="flex" alignItems="center" gap={1} sx={{ margin: 2 }}>
          <img src={post_botX} alt="Post Bot X" style={{ maxWidth: "50px" }} />
          <Title>PostBotX</Title>
        </Box>
        {flattenedResults?.map((result: any, index: number) => (
          <div key={index} className="test-result-card">
            <div className="result-row">
              <strong>Test Data:</strong>
              <pre>{result.testData}</pre>
            </div>
            <div className="result-row">
              <strong>Description:</strong>
              <p>{result.description}</p>
            </div>
            <div className="result-row">
              <strong>Status Code:</strong>
              <p>{result.statusCode}</p>
            </div>
            <div className="result-row">
              <strong>Response Content:</strong>
              <pre>
                {isJSON(result.responseContent)
                  ? JSON.stringify(JSON.parse(result.responseContent), null, 2)
                  : result.responseContent}
              </pre>
            </div>
            <div className="result-row">
              <strong>Is Successful:</strong>
              <p>{result.isSuccessful ? "Yes" : "No"}</p>
            </div>
            <div className="result-row">
              <strong>Error Analysis:</strong>
              <p>{result.errorAnalysis}</p>
            </div>
            <div className="result-row">
              <strong>Time:</strong>
              <p>{parseTime(result.time)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseComponent;
