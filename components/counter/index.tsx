"use client";
import { useCounterStore } from "@/store/useCounter";
import { ButtonGroup, Button, Stack } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export function Counter() {
  const { count, dec, inc } = useCounterStore();

  return (
    <Stack justifyContent="center" alignItems={"center"} gap={3}>
      <p className="text-center">{count}</p>
      <ButtonGroup variant="contained">
        <Button onClick={inc} startIcon={<AddIcon />} variant="contained">
          inc
        </Button>
        <Button onClick={dec} startIcon={<RemoveIcon />} variant="outlined">
          dec
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
