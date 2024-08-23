import { Typography } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import { Launch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  FeatureContainer,
  FeatureContentPaper,
  FeaturePage,
  HomeContent,
  HomePage,
  HomeTitleBox,
  MainButton,
  Title,
} from "./HomeStyle";

const Home = () => {
  const navigateTo = useNavigate();
  return (
    <>
      <HomePage>
        <Navbar />
        <HomeContent>
          <HomeTitleBox>
            <Title>PostBotX</Title>
            <MainButton
              variant="contained"
              endIcon={<Launch />}
              className="mainButton"
              onClick={() => navigateTo("/api-testing")}
            >
              Get Started
            </MainButton>
          </HomeTitleBox>
        </HomeContent>
      </HomePage>
      <FeaturePage>
        <FeatureContainer>
          <FeatureContentPaper variant="outlined">
            <Typography variant="h6" fontWeight={900}>
              API Testing
            </Typography>
            <Typography color={"white"}>AI enabled API Testing</Typography>
          </FeatureContentPaper>
          <FeatureContentPaper variant="outlined">
            <Typography variant="h6" fontWeight={900}>
              Error Analysis
            </Typography>
            <Typography color={"white"} display={'flex'}>
              Will give you detailed analysis of errors found in API Testing
            </Typography>
          </FeatureContentPaper>
          <FeatureContentPaper variant="outlined">
            <Typography variant="h6" fontWeight={900}>
              Report Generation
            </Typography>
            <Typography color={"white"}>
              Will generate API Testing result report.
            </Typography>
          </FeatureContentPaper>
        </FeatureContainer>
      </FeaturePage>
    </>
  );
};

export default Home;
