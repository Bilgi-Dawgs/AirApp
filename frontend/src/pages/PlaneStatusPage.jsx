import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import { TextField } from '@mui/material';
import { Paper } from '@mui/material';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';

//=====================================================================================

const PlaneStatusPage = () => {
  // Buraya state ve sorgulama mantığı eklenecek
  const handleStatusCheck = () => {
    console.log("Uçuş durumu sorgulanıyor...");
    // API isteği burada yapılacak
  };

  return (
    <Box
        sx={{
        backgroundImage: 'url(/hakkımda/hakkımda-xs.jpg)', 
        '@media (min-width: 768px)': { 
          backgroundImage: 'url(/hakkımda/hakkımda-sm.jpg)',
        },
        '@media (min-width: 1024px)': { 
          backgroundImage: 'url(/hakkımda/hakkımda-md.jpg)',
        },
        '@media (min-width: 1440px)': { 
          backgroundImage: 'url(/hakkımda/hakkımda-lg.jpg)',
        },
        '@media (min-width: 1920px)': { 
          backgroundImage: 'url(/hakkımda/hakkımda-xl.jpg)',
        },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: 'calc(100vh - 128px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { base: 4, md: 8 },
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={6}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: 3,
            p: 4,
            textAlign: 'center',
          }}
        >
          <ConnectingAirportsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Uçuş Durumu
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Uçuş numaranızı girerek (örn: TK1234) güncel durumu kontrol edebilirsiniz.
          </Typography>
          <TextField
            fullWidth
            label="Uçuş Numarası"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button 
            variant="contained" 
            size="large" 
            fullWidth
            onClick={handleStatusCheck}
          >
            Sorgula
          </Button>
          {/* Uçuş durumu sonucu (loading/error/data) buraya gelecek ----> Yağız */} 
        </Paper>
      </Container>
    </Box>
  );
};

export default PlaneStatusPage;
