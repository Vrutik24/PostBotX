import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import post_botX from "../../assets/PostBot_X_image.png";
import {
  SignUpBox,
  StyledTextField,
  ErrorMessage,
  SignUpButton,
  AlreadyAccountButton,
  LogoImage,
  SignUpPage,
} from "./SignUpStyle";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUp: React.FC = () => {
  const { signUp, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  if (currentUser !== null) {
    navigate("/");
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");
      try {
        await signUp(values.name, values.email, values.password);
        navigate("/");
      } catch (err) {
        setError("Failed to sign in. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <SignUpPage>
        <SignUpBox>
          <LogoImage
            src={post_botX}
            alt="PostBot_X"
            onClick={() => navigate("/")}
          />
          <form
            onSubmit={formik.handleSubmit}
            style={{ maxWidth: "400px", margin: "0 auto" }}
          >
            {error && (
            <ErrorMessage variant="body2">{error}
              <IconButton size="small" onClick={() => setError(undefined)} edge="end">
                <Close fontSize="small" sx={{color:"#b1b5ac"}}/>
              </IconButton>
            </ErrorMessage>
          )}
            <StyledTextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.submitCount > 0 && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
            />
            <StyledTextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.submitCount > 0 && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              error={formik.submitCount > 0 && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
            <SignUpButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </SignUpButton>
            <AlreadyAccountButton
              fullWidth
              variant="text"
              onClick={() => navigate("/signin")}
            >
              Already have an Account
            </AlreadyAccountButton>
          </form>
        </SignUpBox>
      </SignUpPage>
    </>
  );
};

export default SignUp;
