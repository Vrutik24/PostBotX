import React from 'react';
import './ResponseComponent.css';

interface TestResult {
  testData: string;
  description: string;
  statusCode: number;
  responseContent: string;
  isSuccessful: boolean;
  errorAnalysis: string;
}

interface ResponseComponentProps {
  testResults: TestResult[];
}

const ResponseComponent: React.FC<ResponseComponentProps> = ({ testResults }) => {
  return (
    <div className="response-container">
      <div className="response-content">
        {testResults.map((result, index) => (
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
              <pre>{JSON.stringify(JSON.parse(result.responseContent), null, 2)}</pre>
            </div>
            <div className="result-row">
              <strong>Is Successful:</strong>
              <p>{result.isSuccessful ? 'Yes' : 'No'}</p>
            </div>
            <div className="result-row">
              <strong>Error Analysis:</strong>
              <p>{result.errorAnalysis}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseComponent;