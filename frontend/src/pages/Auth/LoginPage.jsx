import React from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import { Avatar } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

//=======================================================================

// Paket 1 için -> AUTH PAKETİ :
// Bu bileşen şimdilik "statik"tir. Formun state yönetimi (useState)
// ve submit mantığı (handleSubmit) auth yöneticisi tarafından eklenecektir.

const LoginPage = () => {

  // AUTH kişisi buraya gelip formun state'lerini ve submit fonksiyonunu ekleyecek.
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    // AUTH kişisi BURADA useAuth() hook'undaki login() fonksiyonunu çağıracak.
  };

  return (
    <Grid container component="main" sx={{ height: 'calc(100vh - 128px)' }}> 

      {}
      <Grid
        display={{ xs: 'none', sm: 'block' }}
        sx={{
          backgroundImage: 'url(/deneme-1-bulanık/deneme-1-bulanık-xs.jpg)',
          '@media (min-width: 768px)': { backgroundImage: 'url(/deneme-1-bulanık/deneme-1-bulanık-sm.jpg)' },
          '@media (min-width: 1024px)': { backgroundImage: 'url(/deneme-1-bulanık/deneme-1-bulanık-md.jpg)' },
          '@media (min-width: 1440px)': { backgroundImage: 'url(/deneme-1-bulanık/deneme-1-bulanık-lg.jpg)' },
          '@media (min-width: 1920px)': { backgroundImage: 'url(/deneme-1-bulanık/deneme-1-bulanık-xl.jpg)' },
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        flex={4}
      />

      {}
      <Grid 
        component={Paper} 
        elevation={6} 
        square
        flex={5}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {}
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
            Giriş Yap
          </Typography>

          {/* AUTH paketinin sahibinin yapacağı yer */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-posta Adresi"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Beni Hatırla"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, padding: '0.8rem' }}
            >
              Giriş Yap
            </Button>
            
            {}
            <Grid container spacing={2}>
              <Grid item>
                <MuiLink component={Link} to="/forgot-password" variant="body2">
                  Şifreni mi unuttun?
                </MuiLink>
              </Grid>
              <Grid item>
                <MuiLink component={Link} to="/register" variant="body2">
                  {"/    Hesabın yok mu?   /   Kayıt Ol"}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
