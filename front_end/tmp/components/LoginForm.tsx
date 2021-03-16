import {
  Box,
  Button,
  FormGroup,
  TextField,
  Typography,
  Grid,
  Container,
  Avatar,
} from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import React from "react";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Head from "next/head";
import { object, string } from "yup";

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
  password: "",
  email: "",
};

const LoginForm = () => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>

          <Formik
            validationSchema={object({
              email: string().email("Invalid email").required("required"),
              password: string()
                .required("Please Enter password")
                .min(8)
                .max(50),
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
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field name="email" as={TextField} label="Email" />
                    <ErrorMessage name="email" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
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
                      <Link href="/signup">Don't have an account? Sign up</Link>
                    </Grid>
                  </Grid>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default LoginForm;
