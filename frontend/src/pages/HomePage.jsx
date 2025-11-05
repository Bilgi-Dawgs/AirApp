import React from 'react';
import { Box } from '@mui/material';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { InputAdornment } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

//===============================================================

const HomePage = () => {

  return (
    <Box>
      {}
      <Box
        sx={{
          backgroundImage: 'url(/deneme-1/deneme-1-xs.jpg)',
          '@media (min-width: 768px)': { backgroundImage: 'url(/deneme-1/deneme-1-sm.jpg)' },
          '@media (min-width: 1024px)': { backgroundImage: 'url(/deneme-1/deneme-1-md.jpg)' },
          '@media (min-width: 1440px)': { backgroundImage: 'url(/deneme-1/deneme-1-lg.jpg)' },
          '@media (min-width: 1920px)': { backgroundImage: 'url(/deneme-1/deneme-1-xl.jpg)' },
          backgroundSize: 'cover',
          backgroundColor: '#4E9BDB',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          pb: 6,
        }}
      >
        {/* 2. BÖLÜM: Bilet Filtreleme Formu (Hero'nun İÇİNDE) */}
        <Container maxWidth="lg" sx={{ zIndex: 10 }}>
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(5px)',
              borderRadius: 3,
              padding: 4,
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.17)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
          >
            {}
            <Typography
              variant="h5"
              component="h2"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', color: 'rgba(71, 146, 226, 1)' }}
            >
              BİLET FİLTRELE
            </Typography>

            {}
            <Grid container spacing={3} alignItems="center">
              {/* Nereden */}
              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Nereden?"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightTakeoffIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Nereye */}
              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Nereye?"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightLandIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Gün */}
              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Gün"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EventIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Zaman */}
              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Zaman"
                  type="time"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Uçuş Bul Butonu */}
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold', backgroundColor: '#004a99' }}
                >
                  Uçuş Bul
                </Button>
              </Grid>
            </Grid>
          </Box> {}
        </Container> {/* Container bitiş */}
      </Box> {/* Arkaplan Hero bitiş */}
    </Box>
  );
};

export default HomePage;
