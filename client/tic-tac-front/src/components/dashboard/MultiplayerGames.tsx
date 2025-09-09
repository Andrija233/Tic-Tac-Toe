import { Box, Card, CardActions, CardContent, Chip, Typography, Button, Paper } from "@mui/material";
import type { Game } from "../../types/game";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  allGames: Game[];
  onJoinGame: (id: number) => void;
  onCreateGame: (type: "single" | "multi") => void;
};

export default function MultiplayerGames({ allGames, onJoinGame, onCreateGame }: Props) {
  const multiplayerGames = allGames.filter((g) => g.status === "ongoing" && g.type === "multi");

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Active Multiplayer Games
        </Typography>
        <Chip label={multiplayerGames.length} color="secondary" variant="outlined" />
      </Box>

      {multiplayerGames.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {multiplayerGames.map((game) => (
            <Card
              key={game.id}
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
          ))}
        </Box>
      ) : (
        <Box textAlign="center" py={4}>
          <GroupIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No active multiplayer games available
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Create a new multiplayer game or check back later!
          </Typography>
          <Button
            variant="contained"
            onClick={() => onCreateGame("multi")}
            color="secondary"
            startIcon={<AddIcon />}
          >
            Create Multiplayer Game
          </Button>
        </Box>
      )}
    </Paper>
  );
}
