import React from "react";
import { Typography, Container } from "@mui/material";

function Dashboard() {
  return (
    <Container maxWidth="md">
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        align="center"
        sx={{ marginTop: "4rem" }}
      >
        Vítej v admin panelu
      </Typography>
      <Typography variant="body1"></Typography>
    </Container>
  );
}

export default Dashboard;
