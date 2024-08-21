import { Box, Button, Paper, Typography } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import { Launch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigateTo = useNavigate();
  return (
    <>
      <Box
        className="homePage"
        sx={{ height: "100vh", width: "100vw", backgroundColor: "black" }}
      >
        <Navbar />
        <Box
          className="homeBody"
          sx={{
            width: "100%",
            height: "calc(100% - 50px)",
            display: "flex",
          }}
        >
          <Box
            className="mainTitle"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              margin: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              className="mainTitleTypography"
               sx={{
                fontSize: "56px",
                color: "green",
                letterSpacing: "10px",
              }}
            >
              PostBotX
            </Typography>
            <Button
              variant="contained"
              endIcon={<Launch />}
              className="mainButton"
              onClick={() => navigateTo("/select-testing-mode")}
              sx={{
                backgroundColor: "green",
                color: "white",
                width: "fit-content",
                height: "fit-content",
                padding: "15px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        className="featurePage"
        sx={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "black",
          display: "flex",
        }}
      >
        <Box
          className="featureContainer"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            margin: "auto",
          }}
        >
          <Paper
            variant="outlined"
            className="featureContent"
            sx={{
              width: "300px",
              height: "170px",
              borderRadius: "5px",
              // textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "inherit",
              border: "3px solid green",
              color: "green",
              paddingX: "10px",
            }}
          >
            <Typography variant="h6" fontWeight={900}>
              API Testing
            </Typography>
            <Typography sx={{ color: "white" }}>
              AI enabled API Testing
            </Typography>
          </Paper>
          <Paper
            variant="outlined"
            className="featureContent"
            sx={{
              width: "300px",
              height: "170px",
              borderRadius: "5px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "inherit",
              border: "3px solid green",
              color: "green",
              paddingX: "10px",
            }}
          >
            <Typography variant="h6" fontWeight={900}>
              Error Analysis
            </Typography>
            <Typography fontSize={"15px"} sx={{ color: "white" }}>
              Will give you detailed analysis of errors found in API Testing
            </Typography>
          </Paper>
          <Paper
            variant="outlined"
            className="featureContent"
            sx={{
              width: "300px",
              height: "170px",
              borderRadius: "5px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "inherit",
              border: "3px solid green",
              color: "green",
              paddingX: "10px",
            }}
          >
            <Typography variant="h6" fontWeight={900}>
              Report Generation
            </Typography>
            <Typography sx={{ color: "white" }}>
              Will generate API Testing result report.
            </Typography>
          </Paper>
        </Box>
        {/* <Box
          display="flex"
          flexDirection="column"
          // gap="30px"
          margin={"auto"}
          height={"60%"}
          width={"80%"}
        >
          <Box
            display={"flex"}
            gap={"20px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <img
              src={apiTestingImage}
              alt="API Testing"
              style={{ height: "200px", width: "200px" }}
            />
            <Typography sx={{ color: "white" }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. A in
              sequi quas eligendi unde quos suscipit necessitatibus consequuntur
              ipsum. Earum culpa nobis dolores recusandae reprehenderit porro
              optio consequatur ad? Praesentium?
            </Typography>
          </Box>
          <Box
            display={"flex"}
            gap={"20px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography sx={{ color: "white" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              obcaecati non velit neque explicabo reprehenderit dicta dolor,
              voluptatibus nostrum nobis nemo molestias quis blanditiis culpa
              quidem saepe vel, quia corporis!
            </Typography>
            <img
              src={errorAnalysisImage}
              alt="API Testing"
              style={{ height: "200px", width: "200px" }}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"20px"}
            justifyContent={"space-between"}
          >
            <img
              src={errorAnalysisImage}
              alt="API Testing"
              style={{ height: "200px", width: "200px" }}
            />
            <Typography sx={{ color: "white" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Adipisci, quibusdam iure eum sunt aspernatur repellat velit dolor
              nihil odit veritatis id. Illo vel cupiditate doloribus ratione
              quia quidem corrupti nisi!
            </Typography>
          </Box>
        </Box> */}
      </Box>
    </>
  );
};

export default Home;
