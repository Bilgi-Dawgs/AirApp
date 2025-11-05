import React from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import { Avatar } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

//=========================================================================

const RegisterPage = () => {
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    });
    //AUTH PAKET  useAuth() hook'undaki register() fonksiyonunu çağıracak.
  };

  return (
    <Grid container component="main" sx={{ height: 'calc(100vh - 128px)' }}>
      
      {}
      <Grid
        display={{ xs: 'none', sm: 'block' }}
        sx={{
          backgroundImage: 'url(/deneme-1-bulanık/deneme-1-bulanık-xs.jpg)',
          '@media (min-width: 768px)': { 
            backgroundImage: 'url(/deneme-1-bulanık/deneme-1-bulanık-sm.jpg)',
          },
          '@media (min-width: 1024px)': { 
            backgroundImage: 'url(/deneme-1-bulanık/deneme-1-bulanık-md.jpg)',
          },
          '@media (min-width: 1440px)': { 
            backgroundImage: 'url(/deneme-1-bulanık/deneme-1-bulanık-lg.jpg)',
          },
          '@media (min-width: 1920px)': { 
            backgroundImage: 'url(/deneme-1-bulanık/deneme-1-bulanık-xl.jpg)',
          },
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddAltIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
            Kayıt Ol
          </Typography>

          {}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid xs={12} md={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Ad"
                  autoFocus
                />
              </Grid>
              
              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Soyad"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              
              <Grid xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-posta Adresi"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              
              <Grid xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Şifre"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, padding: '0.8rem' }}
            >
              Kayıt Ol
            </Button>
            
            {}
            <Grid container justifyContent="flex-end">
              <Grid>
                <MuiLink component={Link} to="/login" variant="body2">
                  Zaten hesabın var mı? Giriş Yap
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
