import { Box, Typography, Button, Paper, Container } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const auth = useContext(AuthContext);

  
  if (auth?.token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      py: 8
    }}>
      <Container maxWidth="lg">
        <Paper elevation={10} sx={{
          p: { xs: 3, md: 6 },
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          maxWidth: 800,
          mx: "auto"
        }}>
          
          <Typography variant="h2" fontWeight="800" gutterBottom sx={{
            background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
            fontSize: { xs: "2.5rem", md: "3.5rem" }
          }}>
            🎯 Tic Tac Toe Game
          </Typography>

          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            The ultimate classic game reimagined. Challenge yourself or play with friends!
          </Typography>

          
          <Box sx={{ 
            display: "grid", 
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3, 
            mb: 6 
          }}>
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: "center" }}>
              <Typography variant="h3" sx={{ mb: 2 }}>🎮</Typography>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Single Player
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Test your skills against our intelligent AI opponent.
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3, textAlign: "center" }}>
              <Typography variant="h3" sx={{ mb: 2 }}>👥</Typography>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Multiplayer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Challenge your friends in real-time matches and see who's the ultimate Tic Tac Toe champion.
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3, textAlign: "center" }}>
              <Typography variant="h3" sx={{ mb: 2 }}>📜</Typography>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Game history
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Keep track of your past victories and achievements.
              </Typography>
            </Paper>
          </Box>

          
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" }, 
            gap: 2, 
            justifyContent: "center",
            mb: 4
          }}>
            <Button
              variant="contained"
              component={Link}
              to="/login"
              size="large"
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 2,
                background: "linear-gradient(45deg, #4CAF50 0%, #2E7D32 100%)",
                fontSize: "1.1rem",
                fontWeight: "600",
                "&:hover": {
                  background: "linear-gradient(45deg, #43A047 0%, #1B5E20 100%)",
                }
              }}
            >
              Sign In
            </Button>
            
            <Button
              variant="outlined"
              component={Link}
              to="/register"
              size="large"
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 2,
                borderWidth: 2,
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#667eea",
                borderColor: "#667eea",
                "&:hover": {
                  borderWidth: 2,
                  backgroundColor: "rgba(102, 126, 234, 0.1)",
                  borderColor: "#667eea"
                }
              }}
            >
              Create Account
            </Button>
          </Box>

         
          <Typography variant="body2" color="text.secondary">
            Join thousands of players already enjoying Tic Tac Toe Game!
          </Typography>
        </Paper>

        
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: 4, 
          mt: 6,
          flexWrap: "wrap"
        }}>
          <Box sx={{ textAlign: "center", color: "white" }}>
            <Typography variant="h4" fontWeight="700">10K+</Typography>
            <Typography variant="body2">Active Players</Typography>
          </Box>
          <Box sx={{ textAlign: "center", color: "white" }}>
            <Typography variant="h4" fontWeight="700">50K+</Typography>
            <Typography variant="body2">Games Played</Typography>
          </Box>
          <Box sx={{ textAlign: "center", color: "white" }}>
            <Typography variant="h4" fontWeight="700">99%</Typography>
            <Typography variant="body2">Player Satisfaction</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
