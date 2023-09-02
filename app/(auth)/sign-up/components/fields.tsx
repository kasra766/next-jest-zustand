"use client";

import { useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import { FormField } from "@/components/text-field";
import { type UserSignup, useAuth } from "@/store/useAuth";
import { emailPattern, mobilePattern, strongRegex } from "@/lib/patterns";

export function SignUpFields() {
  const { userSignup: defaultValues, login, signup } = useAuth();
  const { control, handleSubmit } = useForm<UserSignup>({ defaultValues });

  const submit = (data: UserSignup) => {
    signup(data);
    login();
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(submit)} rowGap={2}>
      <Stack direction={"row"} columnGap={2}>
        <FormField
          control={control}
          name="fname"
          rules={{
            required: { value: true, message: "name is required" },
          }}
          type="text"
          label="name"
          autoFocus
        />
        <FormField
          control={control}
          name="lname"
          rules={{
            required: { value: true, message: "last name is required" },
          }}
          type="text"
          label="last name"
        />
      </Stack>
      <Stack direction={"row"} columnGap={2}>
        <FormField
          control={control}
          name="phone"
          rules={{
            required: { value: true, message: "phone is required" },
            pattern: {
              value: mobilePattern,
              message: "mobiles format is wrong",
            },
          }}
          type="tel"
          label="phone"
        />
        <FormField
          control={control}
          name="user_name"
          rules={{
            required: { value: true, message: "user name is required" },
          }}
          type="text"
          label="user name"
        />
      </Stack>
      <FormField
        control={control}
        name="email"
        rules={{
          required: { value: true, message: "email is required" },
          pattern: {
            value: emailPattern,
            message: "emails format is wrong",
          },
        }}
        type="email"
        label="email"
      />

      <FormField
        control={control}
        name="password"
        rules={{
          required: { value: true, message: "password is required" },
          minLength: { value: 8, message: "min length muse be 8 character" },
          pattern: {
            value: strongRegex,
            message:
              "password must consist at least an Uppercase and lowercase and special character(@,$,...) and numbers",
          },
        }}
        type="password"
        label="password"
      />

      <Button fullWidth type="submit" variant="contained">
        Submit
      </Button>
    </Stack>
  );
}
