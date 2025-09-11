import { Box, Typography } from "@mui/material";

type Props = {
  move: { player: string; row: number; col: number };
  index: number;
  total: number;
};

export default function MoveItem({ move, index, total }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        py: 1,
        borderBottom: index < total - 1 ? "1px solid #f5f5f5" : "none",
      }}
    >
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: move.player === "X" ? "#3f51b5" : "#f50057",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 12,
          fontWeight: "bold",
          mr: 1.5,
        }}
      >
        {index + 1}
      </Box>
      <Typography variant="body2">
        <strong style={{ color: move.player === "X" ? "#3f51b5" : "#f50057" }}>
          Player {move.player}
        </strong>{" "}
        placed at ({move.row}, {move.col})
      </Typography>
    </Box>
  );
}
