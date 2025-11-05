import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import { Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { sendSupportTicket } from '../../api/supportApi.js';
import Loader from '../../components/common/Loader.jsx';
import ErrorBox from '../../components/common/ErrorBox.jsx';

//==================================================================================

const HelpPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
    };

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendSupportTicket(formData);
      setSuccess(true);
      event.currentTarget.reset();
    } catch (err) {
      setError(err.message || 'Mesaj gönderilemedi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(/Support/Support-xs.jpg)',
        '@media (min-width: 768px)': { backgroundImage: 'url(/Support/Support-sm.jpg)' },
        '@media (min-width: 1024px)': { backgroundImage: 'url(/Support/Support-md.jpg)' },
        '@media (min-width: 1440px)': { backgroundImage: 'url(/Support/Support-lg.jpg)' },
        '@media (min-width: 1920px)': { backgroundImage: 'url(/Support/Support-xl.jpg)' },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        py: 10,
        px: 3,
        minHeight: '50vh',
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          align="center" 
          sx={{ fontWeight: 'bold', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
        >
          Yardım ve Destek
        </Typography>

        {/* Sıkça Sorulan Sorular */}
        <Paper elevation={9} sx={{ mb: 8, padding: 4, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Sıkça Sorulan Sorular</Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Biletimi nasıl iptal edebilirim?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Biletinizi iptal etmek için 'Rezervasyonlarım' sayfasına gitmeniz ve ilgili uçuşun yanındaki 'İptal Et' butonuna tıklamanız gerekmektedir. İptal koşulları, biletinizin sınıfına göre değişiklik gösterebilir.</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Bagaj hakkım ne kadar?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Yurt içi uçuşlarda 15kg, yurt dışı uçuşlarda ise 20kg bagaj hakkınız bulunmaktadır. Ek bagaj hakkı için web sitemiz üzerinden veya havalimanından işlem yapabilirsiniz.</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Servis Ücreti ne kadar?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Havaalanına doğrudan servislerimiz bulunmamaktadır.</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Müsteri hizmetleri telefon Numaranız nedir?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>155-112-153-3380</Typography>
            </AccordionDetails>
          </Accordion>
        </Paper>

        {}
        <Paper elevation={6} component="form" onSubmit={handleSubmit} sx={{ padding: 4, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(5px)' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Bize Ulaşın</Typography>
          
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <TextField required fullWidth id="name" label="Adınız Soyadınız" name="name" autoComplete="name" />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField required fullWidth id="email" label="E-posta Adresiniz" name="email" type="email" autoComplete="email" />
            </Grid>
            <Grid xs={12}>
              <TextField required fullWidth id="message" label="Mesajınız" name="message" multiline rows={6} />
            </Grid>
          </Grid>
          
          <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3, mb: 2, padding: '1rem', fontSize: '1.1rem' }} disabled={loading}>
            Gönder
          </Button>

          {loading && <Loader text="Mesajınız gönderiliyor..." />}
          {error && <ErrorBox message={error} />}
          {success && <Typography color="success.main" align="center" variant="h6">Mesajınız başarıyla gönderildi!</Typography>}
        </Paper>
      </Container>
    </Box>
  );
};

export default HelpPage;
