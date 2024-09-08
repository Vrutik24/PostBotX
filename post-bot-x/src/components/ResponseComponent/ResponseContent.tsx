import React from 'react';
import './ResponseComponent.css';

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

const ResponseComponent: React.FC<ResponseComponentProps> = ({ testResults }) => {
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
  console.log(flattenedResults);
  
  return (
    <div className="response-container">
      <div className="response-content">
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
              <p>{result.isSuccessful ? 'Yes' : 'No'}</p>
            </div>
            <div className="result-row">
              <strong>Error Analysis:</strong>
              <p>{result.errorAnalysis}</p>
            </div>
            <div className="result-row">
              <strong>Time:</strong>
              <p>{result.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseComponent;