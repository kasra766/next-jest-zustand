"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { useAuth } from "@/store/useAuth";

export function LandingPage() {
  const { isLogin } = useAuth();
  if (isLogin) {
    redirect("/home");
  }
  return (
    <Stack justifyContent={"center"} alignItems={"center"} rowGap={3}>
      <Typography variant="h1">Welcome to over page</Typography>
      <Typography variant="body1" role="contentinfo">
        for seeing your profile please login or sign-up
      </Typography>
      <ButtonGroup size="large">
        <Button
          component={Link}
          href="/login"
          variant="contained"
          role="button"
        >
          Login
        </Button>
        <Button
          component={Link}
          href="/sign-up"
          variant="outlined"
          role="button"
        >
          Sign up
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
