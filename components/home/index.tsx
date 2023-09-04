"use client";
import { useAuth } from "@/store/useAuth";
import { Button, Paper, Stack, Typography } from "@mui/material";

export function Home() {
  const {
    user_information: { user_name },
    logout,
  } = useAuth();

  return (
    <Stack alignItems={"center"} pt={5}>
      <Paper
        elevation={12}
        className="flex min-w-[500px] max-w-[600px] flex-col gap-3 p-5"
      >
        <Typography
          variant="body1"
          textAlign={"center"}
          role="contentinfo"
        >{`welcome dear ${user_name}`}</Typography>
        <Button onClick={logout} variant="contained" role="button">
          Logout
        </Button>
      </Paper>
    </Stack>
  );
}
