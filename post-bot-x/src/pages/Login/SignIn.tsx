import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import post_botX from "../../assets/PostBot_X_image.png";
import {
  SignInContainer,
  SignInBox,
  StyledTextField,
  ErrorMessage,
  SignInButton,
  CreateAccountButton,
  LogoImage,
} from "./SignInStyle";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignIn: React.FC = () => {
  const { signIn, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  if (currentUser !== null) {
    navigate("/");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        await signIn(values.email, values.password);
        navigate("/");
      } catch (err) {
        setError("Failed to sign in. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <SignInContainer maxWidth="xs">
      <SignInBox>
        <LogoImage
          src={post_botX}
          alt="PostBot_X"
          onClick={() => navigate("/")}
        />
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <StyledTextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <StyledTextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {error && <ErrorMessage variant="body2">{error}</ErrorMessage>}
          <SignInButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </SignInButton>
        </form>
        <CreateAccountButton
          fullWidth
          variant="text"
          onClick={() => navigate("/signup")}
        >
          Create Account
        </CreateAccountButton>
      </SignInBox>
    </SignInContainer>
  );
};

export default SignIn;
