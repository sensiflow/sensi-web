import * as React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Header from "../../../components/header/header";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormInputText from "../../../components/form/form-input-text";

type FormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const CreateUserPage = () => {
  const methods = useForm<FormInput>();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit: SubmitHandler<FormInput> = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="Create User" subTitle="Create a new user profile" />
      <FormProvider {...methods}>
        <Box
          display="grid"
          gap={"30px"}
          gridTemplateColumns={"repeat(" + (isNonMobile ? 4 : 2) + ", minmax(0, 1fr))"}
          padding={isNonMobile ? "30px" : "10px"}
          sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
        >
          <FormInputText
            name="firstName"
            label="First Name"
            required
            sx={{ gridColumn: "span 2" }}
          />
          <FormInputText
            name="lastName"
            label="Last Name"
            required
            sx={{ gridColumn: "span 2" }}
          />
          <FormInputText
            name="email"
            label="Email"
            required
            sx={{ gridColumn: "span 4" }}
          />
          <FormInputText
            name="password"
            label="Password"
            required
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
      </FormProvider>
    </Box>
  );
};

export default CreateUserPage;
