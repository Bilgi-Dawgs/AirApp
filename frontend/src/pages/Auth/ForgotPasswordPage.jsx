import React from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import { Container } from '@mui/material';
import { Avatar } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

//=======================================================================================

// Auth Paket NOTU:
// Formun state yönetimi ve submit mantığı Kişi 1 tarafından eklenecektir.

const ForgotPasswordPage = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
    });
    // AUTH PAKET BURADA şifre sıfırlama API isteğini tetikleyecek.
  };

  return (
    <Box
      sx={{// Dosya yolu: public/deneme-1-bulanık/deneme-1-bulanık.jpg
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

        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        pb: { xs: 6, sm: 12 },
        position: 'relative',
      }}
    >
      <Container
        component="main"
        maxWidth="sm"
        sx={{ position: 'relative', zIndex: 2 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(5px)',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
            Şifremi Unuttum
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
            Hesabınıza bağlı e-posta adresini girin. Size şifrenizi sıfırlamanız için bir link göndereceğiz.
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, padding: '0.8rem' }}
            >
              Sıfırlama Linki Gönder
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
