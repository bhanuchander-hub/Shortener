import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Divider,
  Box,
  Alert,
} from "@mui/material";

export default function Statistics() {
  const [code, setCode] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const handleFetchStats = async (e) => {
    e.preventDefault();
    setError("");
    setStats(null);
    try {
      const response = await axios.get(`http://localhost:5000/shorturls/${code}`);
      setStats(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching statistics");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Card elevation={6} sx={{ borderRadius: 3, p: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
            URL Statistics
          </Typography>
          <form onSubmit={handleFetchStats} noValidate>
            <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
              <TextField
                label="Enter shortcode"
                variant="outlined"
                fullWidth
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ px: 4, py: 1.5, fontWeight: "bold" }}
              >
                Get Stats
              </Button>
            </Box>
          </form>

          
          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}

         
          {stats && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                General Info
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1">
                <strong>Original URL:</strong> {stats.url}
              </Typography>
              <Typography variant="body1">
                <strong>Created At:</strong>{" "}
                {new Date(stats.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                <strong>Expiry:</strong>{" "}
                {new Date(stats.expiry).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                <strong>Total Clicks:</strong> {stats.totalClicks}
              </Typography>

              {/* Click Data */}
              <Typography variant="h6" sx={{ mt: 4 }}>
                Click Data
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {stats.clickData.length > 0 ? (
                  stats.clickData.map((click, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        bgcolor: index % 2 === 0 ? "grey.100" : "grey.200",
                        borderRadius: 2,
                        mb: 1,
                      }}
                    >
                      <ListItemText
                        primary={new Date(click.timestamp).toLocaleString()}
                        secondary={`Referrer: ${click.referrer || "N/A"} | Location: ${
                          click.location || "Unknown"
                        }`}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                    No click data available.
                  </Typography>
                )}
              </List>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
