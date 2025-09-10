import { Box, Typography } from "@mui/material";

export default function NoMoves() {
  return (
    <Box textAlign="center" py={2}>
      <Typography color="text.secondary">No moves yet. Make the first move!</Typography>
    </Box>
  );
}
