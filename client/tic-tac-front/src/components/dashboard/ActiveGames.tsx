import { Box, Card, CardActions, CardContent, Chip, Typography, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import type { Game } from "../../types/game";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  games: Game[];
  onCreateGame: (type: "single" | "multi") => void;
};

export default function ActiveGames({ games, onCreateGame }: Props) {
  const activeGames = games.filter((g) => g.status === "ongoing");

  return (
    <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Your Active Games
        </Typography>
        <Chip label={activeGames.length} color="success" variant="outlined" />
      </Box>

      {activeGames.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {activeGames.map((game) => (
            <Card
              key={game.id}
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
          ))}
        </Box>
      ) : (
        <Box textAlign="center" py={4}>
          <CachedIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No active games
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            All your games are completed or create a new one!
          </Typography>
          <Button
            variant="contained"
            onClick={() => onCreateGame("single")}
            color="success"
            startIcon={<AddIcon />}
          >
            Create New Game
          </Button>
        </Box>
      )}
    </Paper>
  );
}
