import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";
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
  const [error, setError] = useState<string | null>(null);
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
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
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
            <StyledTextField
              fullWidth
              id="name"
              name="name"
              label="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
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
