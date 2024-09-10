import React from "react";
import post_botX from "../../assets/PostBot_X_image.png";
import { Typography } from "@mui/material";
import { Launch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  HomeContent,
  HomeTitleBox,
  HomePage,
  MainButton,
  Title,
  Description,
  FeaturePage,
  FeatureContainer,
  FeatureContentPaper,
} from "./HomeStyle";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header/Header";

const Home = () => {
  const navigateTo = useNavigate();

  return (
    <>
      <HomePage>
        <Header />
        <HomeContent>
          <HomeTitleBox>
            <img
              src={post_botX}
              alt="Post Bot X"
              style={{ maxWidth: "150px" }}
            />
            <Title>PostBotX</Title>
            <MainButton
              variant="contained"
              endIcon={<Launch />}
              onClick={() => navigateTo("/api-testing")}
              sx={{ color: "#151414" }}
            >
              Get Started
            </MainButton>
            <Description>
              PostBotX is an advanced API testing platform designed to
              streamline and enhance the process of API testing. It allows users
              to test APIs by generating diverse payloads and scenarios,
              managing collections of APIs, and providing robust testing
              capabilities.
            </Description>
          </HomeTitleBox>
        </HomeContent>
      </HomePage>
      <FeaturePage>
        <FeatureContainer>
          <FeatureContentPaper variant="outlined">
            <Typography variant="h6" fontWeight={900}>
              API Testing
            </Typography>
            <Typography
              color={"#455a53"}
              sx={{ paddingX: "20px", textAlign: "center" }}
            >
              AI enabled API Testing
            </Typography>
          </FeatureContentPaper>
          <FeatureContentPaper variant="outlined">
            <Typography variant="h6" fontWeight={900}>
              Error Analysis
            </Typography>
            <Typography
              color={"#455a53"}
              sx={{ paddingX: "20px", textAlign: "center" }}
            >
              Detailed analysis of errors found in API Testing
            </Typography>
          </FeatureContentPaper>
          <FeatureContentPaper variant="outlined">
            <Typography variant="h6" fontWeight={900}>
              Report Generation
            </Typography>
            <Typography
              color={"#455a53"}
              sx={{ paddingX: "20px", textAlign: "center" }}
            >
              Generates comprehensive API Testing result reports.
            </Typography>
          </FeatureContentPaper>
        </FeatureContainer>
      </FeaturePage>
    </>
  );
};

export default Home;
