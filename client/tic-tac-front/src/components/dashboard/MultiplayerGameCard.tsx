import { Card, CardContent, CardActions, Typography, Chip, Button, Box } from "@mui/material";
import type { Game } from "../../types/game";

interface Props {
  game: Game;
  onJoinGame: (id: number) => void;
}

export const MultiplayerGameCard = ({ game, onJoinGame }: Props) => (
  <Card
    sx={{
      borderRadius: 2,
      border: "2px solid",
      borderColor: "secondary.light",
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
        <Chip label="Multiplayer" size="small" color="secondary" />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Status:
        </Typography>
        <Chip label={game.status} size="small" color="success" variant="outlined" />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" color="text.secondary">
          Players:
        </Typography>
        <Typography variant="body2" fontWeight="medium">
          {game.player_x && game.player_o ? "2/2" : game.player_x ? "1/2" : "0/2"}
        </Typography>
      </Box>
    </CardContent>
    <CardActions>
      <Button
        onClick={() => onJoinGame(game.id)}
        size="small"
        variant="contained"
        fullWidth
        color="secondary"
        sx={{ borderRadius: 1 }}
      >
        Join Game
      </Button>
    </CardActions>
  </Card>
);
