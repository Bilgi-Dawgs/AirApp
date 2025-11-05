// 3. Adım'da oluşturduğumuz ana API instance'ımızı import ediyoruz
import axiosInstance from './axiosInstance.js';


 // Destek formundan gelen veriyi API'ye gönderir.
 // @param {object} formData - { name: '...', email: '...', message: '...' }
 // @returns {Promise} API'den dönen cevap
 
export const sendSupportTicket = (formData) => {
  // API'mizdeki '/support-ticket' endpoint'ine (adresine) POST isteği atıyoruz
  return axiosInstance.post('/support-ticket', formData);
};