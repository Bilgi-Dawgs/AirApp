export const formatFullDateTime = (dateString) => {
  try {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Europe/Istanbul', 
    };

    return new Intl.DateTimeFormat('tr-TR', options).format(date);
    
  } catch (error) {
    console.error("Tarih formatlama hatası:", error);
    return "Geçersiz Tarih";
  }
};
export const formatDateSimple = (dateString) => {
   try {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Europe/Istanbul',
    };
    return new Intl.DateTimeFormat('tr-TR', options).format(date);

  } catch (error) {
    console.error("Tarih Dönüştürme hatası:", error);
    return "Geçersiz Tarih Girildi";
  }
};