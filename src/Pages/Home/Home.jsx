import React from "react";
import {
  AppBar,
  ScopedCssBaseline,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Stack,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

function Home() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2196f3",
      },
      error: {
        main: "#f44336",
      },
      secondary: {
        main: "#0a0a0a",
      },
      blurred: {
        main: "#f0f0f0",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline>
        <NavBar />
        <LandingSection />
        <Box height="1000px">
          <Container maxWidth="xl">
            <Stack direction="column" alignSelf="center" spacing={1} useFlexGap>
              <Stack
                mt={5}
                direction="row"
                spacing={0}
                useFlexGap
                alignSelf="center"
              >
                <Container>
                  <Box
                    sx={{ bgcolor: "red", width: "400px", height: "400px" }}
                  ></Box>
                </Container>
                <Container sx={{ mt: 10 }}>
                  <Stack
                    spacing={2}
                    useFlexGap
                    sx={{ width: { xs: "100%", sm: "100%" } }}
                  >
                    <Typography variant="h3" fontWeight={700}>
                      User-friendly experience
                    </Typography>
                    <Typography variant="h5">
                      Track user data effectively, receive event updates, and
                      manage notifications easily
                    </Typography>
                    <Button
                      sx={{
                        padding: 2,
                        borderRadius: 4,
                        textTransform: "none",
                        maxWidth: "300px",
                      }}
                      color="secondary"
                      variant="contained"
                    >
                      Find out more
                    </Button>
                  </Stack>
                </Container>
              </Stack>
            </Stack>
          </Container>
        </Box>
        <Box
          height="700px"
          sx={{
            bgcolor: "blurred.main",
          }}
        ></Box>
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}

function LandingSection() {
  return (
    <Box
      height="600px"
      sx={{
        bgcolor: "blurred.main",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignSelf="center"
          spacing={1}
          useFlexGap
          sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
        >
          <Container
            maxWidth={false}
            sx={{
              marginTop: "130px",
              maxWidth: "500px",
            }}
          >
            <Stack
              spacing={2}
              useFlexGap
              sx={{ width: { xs: "100%", sm: "100%" } }}
            >
              <Typography variant="h2" fontWeight={800}>
                Track user <br /> engagement
              </Typography>
              <Typography variant="h5">Boost your event success</Typography>
              <Button
                sx={{ padding: 2, borderRadius: 4 }}
                color="secondary"
                variant="contained"
              >
                Learn how it works
              </Button>
            </Stack>
          </Container>
          <Container
            maxWidth={false}
            sx={{ marginTop: "100px", maxWidth: "500px" }}
          >
            <Box sx={{ bgcolor: "red", width: "400px", height: "400px" }}></Box>
          </Container>
        </Stack>
      </Container>
    </Box>
  );
}

function NavBar() {
  return (
    <AppBar position="relative" color="default">
      <Container maxWidth="xl">
        <Toolbar sx={{ height: "90px" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
            fontWeight={1000}
          >
            Vending Promotions
          </Typography>
          <Box display={"flex"} gap={3}>
            <Button variant="text" disableRipple size="large" color="inherit">
              <Link
                to={"/settings"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Profile
              </Link>
            </Button>
            <Button variant="text" disableRipple size="large" color="inherit">
              <Link
                to={"/dashboard"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Manage
              </Link>
            </Button>
            <Button
              disableRipple
              size="large"
              variant="outlined"
              color="secondary"
            >
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Login
              </Link>
            </Button>
            <Button
              disableRipple
              size="large"
              variant="contained"
              color="secondary"
            >
              <Link
                to={"/signup"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Signup
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Home;
