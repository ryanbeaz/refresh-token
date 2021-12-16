import './App.css';
import { AppBar, Box, Container, Fab, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Refresh } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import axios from "axios";

function App() {
  const code = new URLSearchParams(window.location.search).get('code');
  let token = "";

  if (code) {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.REACT_APP_REDIRECT_URI!);
    
    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: process.env.REACT_APP_CLIENT_ID!,
        password: process.env.REACT_APP_CLIENT_SECRET!
      },
    };

     axios.post('/identity/v1/oauth2/token', params, headers).then(res => {
      token = res.data.refresh_token
    });
  }

  function redirectToLogin() {
    const url = `${process.env.REACT_APP_AUTHORIZE_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${process.env.REACT_APP_SCOPES}`;
    window.open(url, "_self");
  }

  return (
    <><Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Refresh Token
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Refresh Token
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Click the button to generate a new Ebay refresh token.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Fab variant="extended" onClick={() => redirectToLogin()}>
            <Refresh sx={{ mr: 1 }} />
            Refresh
          </Fab>
        </Stack>
      </Container>
      
    </Box>
    <Box>
      <h1>{code}</h1>
    </Box></>
  );
}

export default App;

