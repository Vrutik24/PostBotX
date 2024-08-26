import React from "react";
import post_botX from "../../assets/PostBot_X_image.png";
import { Box } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import { Launch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  HomeContent,
  HomeTitleBox,
  HomePage,
  MainButton,
  Title,
  Description,
} from "./HomeStyle";

const Home = () => {
  const navigateTo = useNavigate();

  return (
    <>
      <HomePage>
        <Navbar />
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
    </>
  );
};

export default Home;
