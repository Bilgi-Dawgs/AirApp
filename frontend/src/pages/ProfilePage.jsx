// DOĞANIN İÇERİK 
import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { Paper } from '@mui/material'; 
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { Divider } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';

//===================================================================================================

const ProfilePage = () => {// DOĞA API'den kullanıcı verisini çekme mantığını ekleyecek
  const user = { // Örnek veri
     firstName: 'Bayram',
     lastName: 'Y.',
     email: 'bayram@email.com',
     phone: '555 123 4567',
     tc: '12345678901'
  };
  const activeBookings = [ {id: 1, text:'IST → ESB - 05 Kasım 2025'} ];
  const pastBookings = [ {id: 1, text:'ADB → SAW - 15 Ekim 2025'} ];

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
          {/* Başlık Bölümü */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, borderBottom: '1px solid #eee', pb: 2 }}>
             <AccountCircleIcon sx={{ fontSize: 60, color: 'primary.main', mr: 2 }}/>
             <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
               Profilim
             </Typography>
             <Button variant="outlined" startIcon={<EditIcon />}>
                Bilgileri Düzenle
             </Button>
          </Box>

          <Grid container spacing={4}>
             {/* Sol Kişisel Bilgiler */}
             <Grid size={{ xs: 12, md: 5 }}>
                <Typography variant="h5" gutterBottom>Kişisel Bilgiler</Typography>
                <List dense>
                  <ListItem><ListItemText primary="Ad Soyad:" secondary={`${user.firstName} ${user.lastName}`} /></ListItem>
                  <Divider component="li" />
                  <ListItem><ListItemText primary="TC Kimlik No:" secondary={user.tc || 'Eklenmemiş'} /></ListItem>
                  <Divider component="li" />
                  <ListItem><ListItemText primary="E-posta:" secondary={user.email} /></ListItem>
                  <Divider component="li" />
                  <ListItem><ListItemText primary="Telefon No:" secondary={user.phone || 'Eklenmemiş'} /></ListItem>
                </List>
             </Grid>

             {/* Sağ Biletler*/}
             <Grid size={{ xs: 12, md: 7 }}>
                <Typography variant="h5" gutterBottom>Aktif Uçak Biletleri</Typography>
                {activeBookings.length > 0 ? activeBookings.map(b => (
                    <Paper key={b.id} variant="outlined" sx={{ p: 1.5, mb: 1.5}}>
                       <Typography variant="subtitle1">{b.text}</Typography>
                    </Paper>
                )) : (
                   <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>Aktif biletiniz bulunmamaktadır.</Typography>
                )}

                <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Geçmiş Uçak Biletleri</Typography>
                 {pastBookings.length > 0 ? pastBookings.map(b => (
                    <Paper key={b.id} variant="outlined" sx={{ p: 1.5, mb: 1.5, opacity: 0.7}}>
                       <Typography variant="subtitle1">{b.text}</Typography>
                    </Paper>
                 )) : (
                    <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>Geçmiş biletiniz bulunmamaktadır.</Typography>
                 )}
             </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePage;
