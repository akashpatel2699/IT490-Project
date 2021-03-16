import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { object, string, ref} from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Button,
  FormGroup,
  TextField,
  Typography,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#3CBC8D",
    padding: theme.spacing(4),
    borderRadius: "1rem",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    background: "inherit",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "var(--text-primary)",
    transition: "all 1s ease-in-out",
    "&:hover": {
      background: "var(--background)",
    },
  },
}));

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const SignupForm = () => {
  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Formik
            validationSchema={object({
              fullName: string().required("Enter full name"),
              email: string().email("Invalid email").required("required"),
              password: string()
                .required("Please Enter password")
                .min(8)
                .max(50),
              passwordConfirm: string()
                .oneOf([ref("password")], "Password do not match")
                .required("Password confirm is required"),
            })}
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {
              return new Promise((res) => {
                setTimeout(() => {
                  console.log(values);
                  console.log(formikHelpers);
                  console.log("----------------");
                  res("null");
                }, 5000);
              });
            }}
          >
            {({ values, errors, isSubmitting, isValidating }) => (
              <Form className={classes.form} noValidate>
                <Box>
                  <FormGroup>
                    <Field name="fullName" as={TextField} label="Full Name" />
                    <ErrorMessage name="fullName" />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup>
                    <Field name="email" as={TextField} label="Email Address" />
                    <ErrorMessage name="email" />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup>
                    <Field
                      name="password"
                      as={TextField}
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                    />
                    <ErrorMessage name="password" />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup>
                    <Field
                      name="passwordConfirm"
                      as={TextField}
                      label="Confirm Password"
                      type="password"
                    />
                    <ErrorMessage name="passwordConfirm" />
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup>
                    <Button
                      type="submit"
                      disabled={isSubmitting || isValidating}
                      className={classes.submit}
                    >
                      Submit
                    </Button>
                    <Grid container justify="flex-end">
                      <Grid item>
                        <NavLink to="/login">
                          <a>Already have an account? Sign in</a>
                        </NavLink>
                      </Grid>
                    </Grid>
                  </FormGroup>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default SignupForm;
