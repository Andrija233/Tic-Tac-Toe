import { Box } from "@mui/material";
import MoveItem from "./MoveItem";

type Props = {
  moves: { player: string; row: number; col: number }[];
};

export default function MoveList({ moves }: Props) {
  return (
    <Box
      sx={{
        maxHeight: 200,
        overflowY: "auto",
        border: "1px solid #eee",
        borderRadius: 2,
        p: 2,
      }}
    >
      {moves.map((m, i) => (
        <MoveItem key={i} move={m} index={i} total={moves.length} />
      ))}
    </Box>
  );
}
