// YAĞMUR BABADA
import React from 'react';
import { Box } from '@mui/material'; 
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import { Paper } from '@mui/material';
import { Stepper } from '@mui/material';
import { Step } from '@mui/material';
import { StepLabel } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

//================================================================================

const steps = ['Yolcu Bilgileri', 'Koltuk Seçimi', 'Ödeme'];

const TicketPurchasePage = () => {
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
        py: { xs: 4, md: 8 },
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: 3,
            p: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', mb: 3 }}>
            <CreditCardIcon sx={{ fontSize: 40, color: 'success.main', mr: 1 }}/>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Bilet Al
            </Typography>
          </Box>
          
          <Stepper activeStep={0} alternativeLabel sx={{ mb: 4 }}> 
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign:'center' }}>
            (Kişi 3 burayı dolduracak: Aktif adıma göre formlar gösterilecek.)
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
             <Button variant="outlined" disabled>Geri</Button> {/* Tuşlar */}
             <Button variant="contained" color="success">İleri</Button> {/* Tuşlar */}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default TicketPurchasePage;
