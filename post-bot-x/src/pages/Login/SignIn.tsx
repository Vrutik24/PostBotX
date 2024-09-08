import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgress, IconButton, InputAdornment, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import post_botX from "../../assets/PostBot_X_image.png";
import {
  SignInBox,
  StyledTextField,
  ErrorMessage,
  SignInButton,
  CreateAccountButton,
  LogoImage,
  SignInPage,
} from "./SignInStyle";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";

const SignIn: React.FC = () => {
  const { signIn, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  if (currentUser !== null) {
    navigate("/");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMessage("");
      try {
        await signIn(values.email, values.password);
        navigate("/");
      } catch (err) {
        setErrorMessage("Incorrect email or password. Try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <SignInPage>
        <SignInBox>
          <LogoImage
            src={post_botX}
            alt="PostBot_X"
            onClick={() => navigate("/")}
          />
          {errorMessage && (
            <ErrorMessage variant="body2">{errorMessage}
              <IconButton size="small" onClick={() => setErrorMessage(undefined)} edge="end">
                <Close fontSize="small" sx={{color:"#b1b5ac"}}/>
              </IconButton>
            </ErrorMessage>
          )}
          <form
            onSubmit={formik.handleSubmit}
            style={{ maxWidth: "400px", margin: "0 auto" }}
          >
            <StyledTextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <StyledTextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                      sx={{ color: "#b1b5ac" }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <SignInButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"}
            </SignInButton>
            <CreateAccountButton
              variant="text"
              fullWidth
              onClick={() => navigate("/signup")}
            >
              Create Account
            </CreateAccountButton>
          </form>
        </SignInBox>
      </SignInPage>
    </>
  );
};

export default SignIn;
