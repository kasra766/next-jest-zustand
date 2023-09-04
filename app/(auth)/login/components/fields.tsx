"use client";
import { Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormField } from "@/components/text-field";
import { useAuth } from "@/store/useAuth";

export function LoginFields() {
  const { login, signup } = useAuth();
  const { control, handleSubmit } = useForm({
    defaultValues: { user_name: "", password: "" },
  });

  const submit = (data: { user_name: string; password: string }) => {
    signup(data);
    login();
  };
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(submit)}
      elevation={12}
      className="flex min-w-[500px] max-w-[600px] flex-col gap-3 p-8"
    >
      <Typography variant="h4" mb={2} role="header">
        Login
      </Typography>

      <FormField
        control={control}
        name="user_name"
        rules={{ required: true }}
        type="text"
        autoFocus
        label="User Name"
        fullWidth
      />
      <FormField
        control={control}
        name="password"
        rules={{
          required: true,
          minLength: {
            value: 8,
            message: "password must be at least 8 character",
          },
        }}
        type="password"
        label="Password"
        fullWidth
      />
      <Button variant="contained" type="submit">
        submit
      </Button>
    </Paper>
  );
}
