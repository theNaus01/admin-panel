import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

// Zadávání loginu
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Potvrzování loginu
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "a" && password === "a") {
      onLogin();
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "2rem", marginTop: "3rem" }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Login Page
        </Typography>
        <form onSubmit={handleLogin}>
          <Box display="flex" flexDirection="column" gap="1rem">
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
