import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("professional");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateReply = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailContent, tone }),
      });

      const data = await res.text();
      setResponse(data);
    } catch (error) {
      setResponse("Something went wrong...");
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#667eea,#764ba2)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 4, boxShadow: 8 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              align="center"
              gutterBottom
            >
              AI Email Reply Generator
            </Typography>

            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              mb={3}
            >
              Generate professional AI-powered email replies instantly
            </Typography>

            {/* Email Input */}
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Paste Original Email"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ mb: 3 }}
            />

            {/* Tone Selector */}
            <TextField
              select
              fullWidth
              label="Select Tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              sx={{ mb: 3 }}
            >
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
              <MenuItem value="formal">Formal</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
            </TextField>

            {/* Generate Button */}
            <Box textAlign="center" mb={3}>
              <Button
                variant="contained"
                size="large"
                // startIcon={<AutoAwesomeIcon />}
                onClick={generateReply}
                disabled={loading || !emailContent}
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Generate Reply"}
              </Button>
            </Box>

            {/* Response Section */}
            {response && (
              <Box position="relative">
                <TextField
                  fullWidth
                  multiline
                  rows={8}
                  label="AI Generated Reply"
                  value={response}
                  InputProps={{ readOnly: true }}
                />

                {/* Copy Button */}
                <IconButton
                  onClick={copyToClipboard}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    bgcolor: "white",
                    boxShadow: 2,
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
      >
        <Alert severity="success" variant="filled">
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;