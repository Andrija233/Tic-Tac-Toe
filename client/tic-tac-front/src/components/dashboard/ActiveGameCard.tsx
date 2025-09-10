import { Card, CardContent, CardActions, Typography, Chip, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import type { Game } from "../../types/game";

interface Props {
  game: Game;
}

export const ActiveGameCard = ({ game }: Props) => (
  <Card
    sx={{
      borderRadius: 2,
      border: "2px solid",
      borderColor: "success.light",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      },
    }}
  >
    <CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Typography variant="h6" component="div">
          Game #{game.id}
        </Typography>
        <Chip label={game.type} size="small" color={game.type === "single" ? "primary" : "secondary"} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Status:
        </Typography>
        <Chip label={game.status} size="small" color="success" variant="outlined" />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" color="text.secondary">
          Winner:
        </Typography>
        <Typography variant="body2" fontWeight="medium">
          {game.winner || "TBD"}
        </Typography>
      </Box>
    </CardContent>
    <CardActions>
      <Button
        component={Link}
        to={`/game/${game.id}`}
        size="small"
        variant="contained"
        fullWidth
        sx={{ borderRadius: 1 }}
      >
        Continue Game
      </Button>
    </CardActions>
  </Card>
);
