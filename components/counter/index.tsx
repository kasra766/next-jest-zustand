"use client";
import { useCounter, useCounterStore } from "@/store/useCounter";
import { ButtonGroup, Button, Stack } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export function Counter() {
  const { count, dec, inc } = useCounter();
  const increments = () => {
    inc();
  };
  return (
    <Stack justifyContent="center" alignItems={"center"} gap={3}>
      <p className="text-center" role="count_value">
        {count}
      </p>
      <ButtonGroup variant="contained">
        <Button
          onClick={inc}
          startIcon={<AddIcon />}
          variant="contained"
          data-testid="inc"
        >
          inc
        </Button>
        <Button
          onClick={dec}
          startIcon={<RemoveIcon />}
          variant="outlined"
          data-testid="dec"
        >
          dec
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
