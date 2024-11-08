import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Ověření přihlášení
  const [mobileOpen, setMobileOpen] = useState(false); // Ověření otevření bočního navbaru u mobilu

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Funkce pro odhlášení
  const handleLogout = () => {
    setIsAuthenticated(false);
    setMobileOpen(false);
  };

  // Otevírání bočního panelu
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Boční panel u mobilu
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button onClick={handleLogout} component={Link} to="/">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Router>
      {isAuthenticated && (
        <AppBar position="static">
          <Toolbar>
            <Grid container alignItems="center">
              <Grid item xs={8} sm={3}>
                <Typography variant="h6">Admin Panel</Typography>
              </Grid>

              {/* Prostřední ikony na stránky */}
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  justifyContent: "center",
                }}>
                <Button
                  color="inherit"
                  component={Link}
                  to="/dashboard"
                  startIcon={<DashboardIcon />}>
                  Dashboard
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/products"
                  startIcon={<InventoryIcon />}>
                  Products
                </Button>
              </Grid>

              {/* Ikona menu pro mobil */}
              <Grid
                item
                xs={4}
                sm={3}
                sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ display: { sm: "none" } }}>
                  <MenuIcon />
                </IconButton>

                {/* Tlačítko logout na pc */}
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  component={Link}
                  to="/"
                  startIcon={<LogoutIcon />}
                  sx={{
                    marginLeft: "auto",
                    display: { xs: "none", sm: "inline-flex" },
                  }}>
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
            }}>
            {drawer}
          </Drawer>
        </AppBar>
      )}

      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
};

export default App;
