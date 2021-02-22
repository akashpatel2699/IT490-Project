import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import React from "react";
import Link from "next/link";
import { object, string } from "yup";

const initialValues = {
  password: "",
  email: "",
};

const LoginForm = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Login</Typography>

        <Formik
          validationSchema={object({
            email: string().email("Invalid email").required("required"),
            password: string().required("Please Enter password").min(8).max(50),
          })}
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            return new Promise((res) => {
              setTimeout(() => {
                console.log(values);
                console.log(formikHelpers);
                console.log("----------------");
                res();
              }, 5000);
            });
          }}
        >
          {({ values, errors, isSubmitting, isValidating }) => (
            <Form>
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

              <Button type="submit" disabled={isSubmitting || isValidating}>
                Submit
              </Button>
              <Typography>
                <Link href="/signup" variant="body2">
                  Don't have account? Sign up
                </Link>
              </Typography>
{/* 
              <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre> */}
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
