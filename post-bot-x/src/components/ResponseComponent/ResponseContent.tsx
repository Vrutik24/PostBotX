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
      format: [canvas.width * 0.8 + 60, canvas.height + 160],
    });

    // Add post_botX image at the top of the PDF (adjust coordinates as needed)
    const postBotXImage = new Image();
    postBotXImage.src = post_botX;

    postBotXImage.onload = function () {
      const padding = 30;
      const imgWidth = 100;
      const imgHeight = 100;
      const imgX = padding; // Left-align the image with padding
      const textX = imgX + imgWidth + 20; // Position text next to the image with some spacing

      pdf.addImage(postBotXImage, "PNG", imgX, padding, imgWidth, imgHeight); // Adjusted y-coordinate for padding

      // Add styled text
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(50);
      pdf.setTextColor(76, 175, 80);
      const text = "PostBotX";
      const letterSpacing = 4;

      let xOffset = textX;
      for (let i = 0; i < text.length; i++) {
        pdf.text(text[i], xOffset, padding + 20 + imgHeight / 2); // Center text vertically with the image
        xOffset += pdf.getTextWidth(text[i]) + letterSpacing;
      }

      // Add the rest of the content below the image and text
      const contentY = imgHeight + padding + 30; // Adjusted y-coordinate for padding
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * padding; // Adjusted for padding
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", padding, contentY, pdfWidth, pdfHeight); // Adjusted y-coordinate and added padding

      // Save the PDF
      pdf.save("TestResults.pdf");
      setIsDownloading(false);
    };
  };

  const parseTime = (timeString: string): string => {
    const [hours, minutes, seconds] = timeString.split(":");

    const [secs, millis] = seconds.split(".");

    const totalSeconds =
      (parseInt(hours) || 0) * 3600 +
      (parseInt(minutes) || 0) * 60 +
      (parseInt(secs) || 0);

    const totalMilliseconds = totalSeconds * 1000 + (parseInt(millis) || 0);
    const formattedMilliseconds = totalMilliseconds.toString().slice(0, 3);

    if (totalSeconds < 1) {
      return `${formattedMilliseconds}ms`;
    } else {
      const formattedSeconds = (
        totalSeconds +
        (parseInt(millis) || 0) / 10000000
      ).toFixed(2);
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
          marginBottom: "40px",
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
        {flattenedResults?.map((result: any, index: number) => (
          <div key={index} className="test-result-card">
            <div className="result-row">
              <span>Test Data:</span>
              <pre>{result.testData}</pre>
            </div>
            <div className="result-row">
              <span>Description:</span>
              <p>{result.description}</p>
            </div>
            <div className="result-row">
              <span>Status Code:</span>
              <p>{result.statusCode}</p>
            </div>
            <div className="result-row">
              <span>Response Content:</span>
              <pre>
                {isJSON(result.responseContent)
                  ? JSON.stringify(JSON.parse(result.responseContent), null, 2)
                  : result.responseContent}
              </pre>
            </div>
            <div className="result-row">
              <span>Is Successful:</span>
              <p>{result.isSuccessful ? "Yes" : "No"}</p>
            </div>
            <div className="result-row">
              <span>Error Analysis:</span>
              <p>{result.errorAnalysis}</p>
            </div>
            <div className="result-row">
              <span>Time:</span>
              <p>{parseTime(result.time)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseComponent;
