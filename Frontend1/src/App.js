import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Shortener from "./pages/Shortener";
import Statistics from "./pages/Statistics";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";

export default function App() {
  return (
    <BrowserRouter>
      
      <AppBar position="sticky" sx={{ background: "linear-gradient(90deg,#4c51bf,#6b46c1)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" fontWeight="bold">
           Shortener
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">
              Shortener
            </Button>
            <Button color="inherit" component={Link} to="/stats">
              Statistics
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

    

    
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Routes>
          <Route path="/" element={<Shortener />} />
          <Route path="/stats" element={<Statistics />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
