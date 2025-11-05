// YAĞMUR VE DOĞADA 
import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import { Paper } from '@mui/material';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { Divider } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

//===================================================================================================================

const MyBookingsPage = () => {
  // Örnek veri APIden gelecek
  const bookings = [
    { id: 1, pnr: 'ABCD12', from: 'İstanbul (IST)', to: 'Ankara (ESB)', date: '30 Ekim 2025', time: '14:30', status: 'Aktif' },
    { id: 2, pnr: 'EFGH34', from: 'İzmir (ADB)', to: 'İstanbul (SAW)', date: '15 Ekim 2025', time: '09:00', status: 'Tamamlandı' },
  ];

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
        py: { xs: 4, md: 8 },
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: 3,
            p: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FlightIcon sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Biletlerim (Rezervasyonlar)
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Geçmiş ve gelecek uçuş rezervasyonlarınızı ("bilet satma" / yönetme) buradan yapabilirsiniz.
          </Typography>

          <List>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <React.Fragment key={booking.id}>
                  <ListItem
                    secondaryAction={//TUŞLARIM
                      booking.status === 'Aktif' ? (
                        <>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<EditIcon />}
                            sx={{ mr: 1 }}
                          >
                            Değiştir
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<CancelIcon />}
                          >
                            İptal Et
                          </Button>
                        </>
                      ) : null
                    }
                  >
                    <ListItemText
                      primary={`${booking.pnr} - ${booking.from} → ${booking.to}`}
                      secondary={`${booking.date}, ${booking.time} - Durum: ${booking.status}`}
                    />
                  </ListItem>
                  {index < bookings.length - 1 && <Divider />}
                </React.Fragment>
              ))
            ) : (
              <Typography sx={{ mt: 3, textAlign: 'center' }}>
                Aktif veya geçmiş rezervasyon bulunamadı.
              </Typography>
            )}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default MyBookingsPage;
