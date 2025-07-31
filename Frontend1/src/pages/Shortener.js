import React, { useState } from "react";
import API from "../api";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Card,
  CardContent,
  Box,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function Shortener() {
  const [url, setUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]); 
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await API.post("/shorturls", { url });
      setShortUrls((prev) => [
        ...prev,
        { original: url, short: response.data.shortLink },
      ]);
      setUrl(""); 
    } catch (err) {
      setError(err.response?.data?.error || "Error creating short URL");
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card elevation={6} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
            URL Shortener
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleSubmit} noValidate>
            <Box display="flex" gap={2} flexDirection="column">
              <TextField
                label="Enter URL to shorten"
                variant="outlined"
                fullWidth
                required
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ py: 1.5, fontWeight: "bold", borderRadius: 2 }}
              >
                Shorten URL
              </Button>
            </Box>
          </form>

          
          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}

          
          {shortUrls.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Your Shortened Links
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <List> 
                {shortUrls.map((item, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <Tooltip title="Copy to clipboard">
                        <IconButton
                          edge="end"
                          color="primary"
                          onClick={() => handleCopy(item.short)}
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ListItemText
                      primary={
                        <Link
                          href={item.short}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="hover"
                          sx={{ fontWeight: "bold" }}
                        >
                          {item.short}
                        </Link>
                      }
                      secondary={`Original: ${item.original}`}
                    />
                  </ListItem>
                ))}
              </List> 
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
