import React from 'react';
import { Box } from '@mui/material';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material';

//================================================================

const PrivacyPage = () => {
  const theme = useTheme();
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
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
            textAlign: 'center',
            color: theme.palette.common.white,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', fontFamily: theme.typography.fontFamily }}
          >
            Gizlilik Politikası
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            Bilgi Dawgs Air olarak kullanıcılarımızın gizliliğine önem veriyoruz. Topladığımız bilgiler yalnızca uçuş rezervasyonları, kullanıcı deneyimini geliştirme ve hizmetlerimizi iyileştirmek amacıyla kullanılmaktadır.
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            Kişisel bilgileriniz üçüncü taraflarla paylaşılmamaktadır. Web sitemizde kullanılan çerezler (cookies) sadece site kullanımını kolaylaştırmak ve deneyimi iyileştirmek için kullanılmaktadır.
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            Bu gizlilik politikası zaman zaman güncellenebilir. Güncellemeler bu sayfada yayınlanacaktır.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPage;
