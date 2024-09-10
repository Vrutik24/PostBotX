<p align="center">
  <img src="./post-bot-x/src/assets/PostBot_X_image.png" alt="PostBotX Logo" width="200" height="200"/>
</p>

# PostBotX

This software offers a combination of AI-enabled API testing and manual testing to ensure thorough evaluation of APIs. It includes a detailed analysis of any errors found during the API testing process. Additionally, it generates comprehensive reports that provide a clear overview of the testing results.

## Table of Contents

- Installation
- Prerequisites
- Features

## Installation

Instructions on how to install and set up the project.

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Vrutik24/PostBotX.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd post-bot-x
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Run the project**:
    ```bash
    npm start
    ```

5. **Open your browser** and go to `http://localhost:3000` to see the project in action.

## Prerequisites

- Node.js
- npm

## Features

- Automated Testing (AI Enabled)
- Manual Testing
- Error Analysis
- Download Test Reports
- Collaborative testing
- Anonymous Data Persistence

## Comprehensive Feature Guide

### 1. Automated Testing (AI Enabled)
Our AI-powered automated testing accelerates the process of testing GET, POST, PUT, PATCH, and DELETE APIs. It intelligently generates both query parameters and payloads, covering positive and negative scenarios. This ensures comprehensive testing, drastically reducing manual effort while delivering thorough and efficient results

#### <h3><u>•  Automated Testing of Post/Put API Call</u></h3>
---
#### Configuring JSON Payloads for API Testing
You can input a JSON payload and use the **Configure JSON Object** button to generate a configured JSON object that will serve as the payload for your API calls as you can see in below image. Each field of this configured object includes:

- **Data Type**: Defines the type of data for each field.
- **Behavior Directive**: Specifies whether the value is fixed or randomized.
- **Value**: Ideally a positive example value to enhance payload generation quality.
- **Validation**: (Optional) Adds validation rules for each field.

This configured JSON object acts as a template for generating test payloads, enabling structured and efficient API testing.

Example Payload

```bash
    {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  }
```
<br/>

Example Url

```bash
    https://jsonplaceholder.typicode.com/posts
```


![image](https://github.com/user-attachments/assets/1b4949e6-db59-4e90-a292-36629e22abd4)

### API Request Testing

As you can see in above image, to test the API request, follow these steps:

1. **Select API Type**:
   - Choose the appropriate API type for your request.

2. **Provide URL**:
   - Enter the URL for the API endpoint.

3. **Generate Configured Payload**:
   - Generate Configured Json object.

4. **Add Headers**:
   - Specify the necessary headers for the API request, such as:
     - `Authorization`
     - `Content-Type`

5. **Send Request**:
   - Click on the **Send** button to test the API.

Once the initial payload is configured and submitted, the AI model will automatically generate multiple payloads to cover a wide range of scenarios, including both positive and negative cases. The responses for all these generated payloads will be provided for review.

You will be able to see response in Draggable Component like this:

![image](https://github.com/user-attachments/assets/48f3093d-b0b3-4e40-90e4-8a2720c9d2da)



#### <h3><u>•  Automated Testing of Get/Delete API Call</u></h3>
---

AI model creates a spectrum of test scenarios by dynamically generating multiple values for each query parameter, ensuring a comprehensive assessment of API behavior

Example Url

```bash
    https://jsonplaceholder.typicode.com/posts
```

![image](https://github.com/user-attachments/assets/1a3eda16-b221-45bc-8f03-91310572e97f)

### API Request Testing

As you can see in above image, to test the API request, follow these steps:

1. **Select API Type**:
   - Choose the appropriate API type for your request.

2. **Provide URL**:
   - Enter the URL for the API endpoint.

3. **Add Headers**:
   - Specify the necessary headers for the API request, such as:
     - `Authorization`
     - `Content-Type`

4. **Add QueryParameters**:
   - array of query parameters, each with a key and a single value (value must be positve case for better testing of api):

5. **Send Request**:
   - Click on the **Send** button to test the API.


### 2. Manual Testing

#### <h3><u>•  Manual Testing of Post/Put API Call</u></h3>
---

This feature lets users run customized tests on their **POST** and **PUT** APIs by providing multiple payloads, which the app uses to test the API. The details include:

Example Url

```bash
    https://jsonplaceholder.typicode.com/posts
```

![image](https://github.com/user-attachments/assets/626a448d-311c-47d8-b194-0d58b832a0f9)

### API Request Testing

1. **Select API Type**:
   - Choose the appropriate API type for your request.

2. **Provide URL**:
   - Enter the URL for the API endpoint.

3. **Add Headers**:
   - Specify the necessary headers for the API request, such as:
     - `Authorization`
     - `Content-Type`

3. **Payload**:
   - Provide an array of Json object (Multiple payloads as shown in above image).

5. **Send Request**:
   - Click on the **Send** button to test the API.


#### <h3><u>•  Manual Testing of Get/Delete API Call</u></h3>
---

The Manual Testing feature in our API Testing UI enhances the testing capabilities for Get/Delete APIs by allowing users to provide multiple values for each query parameter. This empowers users to perform thorough and customized assessments of their APIs under diverse conditions.

Example Url

```bash
    https://jsonplaceholder.typicode.com/posts
```

![image](https://github.com/user-attachments/assets/767ccb81-7a1f-4b17-8d8b-0fadcb00a30a)

### API Request Testing

1. **Select API Type**:
   - Choose the appropriate API type for your request.

2. **Provide URL**:
   - Enter the URL for the API endpoint.

3. **Add Headers**:
   - Specify the necessary headers for the API request, such as:
     - `Authorization`
     - `Content-Type`

4. **Add QueryParameters**:
   - Provide an array of query parameters, each with a key and a multiple value.

5. **Send Request**:
   - Click on the **Send** button to test the API.


### 3. Error Analysis
  Error Analysis helps you to diagnose and understand issues by providing detailed insights into test failures.

**Key Benefits:**
- Comprehensive error reporting with detailes.
- Helps you to identify root causes and potential fixes.
  


### 4. Download Test Reports
  The ability to download Test Reports allows you to generate and export detailed reports of your test analyses. These reports include test results, execution details, and any errors or issues encountered.

**Key Benefits:**
- Easy export of test results for offline review and record-keeping.
- Shareable reports for stakeholders and team members.

Example Report:

[Download the Report](./post-bot-x/src/assets/Post_API_Report.pdf)

### 5. Collaborative Testing
  Collaborative Testing enables you to share API collections and test scenarios with other users. This feature supports teamwork by allowing multiple users to work on the same project, exchange feedback, and collaborate on test development. Additionally, we have given a notification feature which gives you the authority to accept or deny shared collections, ensuring full control over the collaboration process.

**Key Benefits:**
- Seamless sharing of test collections with team members.
- Improved collaboration and feedback loops.
- Enhanced productivity with shared test resources and knowledge.

You can share collection from here,

![image](https://github.com/user-attachments/assets/496088db-f949-47f3-9c06-4aa04a32c7c5)

User will receive notifications for collection acceptance or denial, which can be viewed from both the Home page and the API Testing page as shown below.

![image](https://github.com/user-attachments/assets/b66952c6-9665-489f-ae14-c6ffddc28cfe)

![image](https://github.com/user-attachments/assets/e81f3c35-4a34-429e-90b8-7432c22ddde1)


### 6. Anonymous Data Persistence
  Even if you haven’t created an account, any collections or APIs you add will be stored under an anonymous user profile. Once you sign up and log in, all the data you previously created will automatically be associated with your new account, ensuring a seamless transition.

**Key Benefits:**
- Start building collections and APIs without needing to register or log in.
- All data created as an anonymous user is preserved and linked once you sign in, preventing data loss.
- Continue working on your APIs and collections without disruption, whether you're logged in or not.
- Eliminate the need to re-create data after registration, saving time and effort

