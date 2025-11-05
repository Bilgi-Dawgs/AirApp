import React from 'react';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';

//=============================================================

const AboutPage = () => {
  return (
    <Box
      sx={{// Dosya yolu: public/hakkımda/hakkımda-xs.jpg
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
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        pb: { xs: 6, sm: 12 },
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(5px)',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            color: 'white',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Hakkımızda
          </Typography>
          <Typography variant="body1" paragraph>
            Bilgi Dawgs Air, 2025 yılında, havacılığa meraklı ve teknoloji tutkunu bir grup arkadaş tarafından kuruldu. Amacımız, uçak bileti almayı hem hızlı hem kolay, hatta eğlenceli bir deneyim hâline getirmek.
          </Typography>
          <Typography variant="body1" paragraph>
            Henüz yeni bir şirket olmamıza rağmen birçok farklı firma ile anlaşmalar yaptık ve kullanıcılarımıza çeşitli uçuş seçenekleri sunabiliyoruz. Zamanla daha da büyüyerek hayal ettiğimiz noktaya ulaşmayı hedefliyoruz.
          </Typography>
          <Typography variant="body1" paragraph>
            Bu projede emeği geçen Yağız, Emir, Bayram, Umut, Yağmur ve Doğa’ya teşekkür ederiz; onların katkıları olmasa bu hayal gerçekleşemezdi.
          </Typography>
          <Typography variant="h6" component="p" sx={{ mt: 3, fontStyle: 'italic' }}>
            Bilgi Dawgs Air ile gökyüzü artık biraz daha yakın!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutPage;
