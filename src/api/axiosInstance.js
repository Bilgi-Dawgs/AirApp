
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants.js'; 

// 1. Axios'u oluştur (Projenin kalbi 🚀)
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, 
});

// 2. ➡️ Request Interceptor (Her istek GÖNDERİLMEDEN önce çalışır)
// BURASI AUTH KİŞİSİ İÇİN
axiosInstance.interceptors.request.use(
  (config) => {
    // --- KİŞİ 1'E SORU ---
    // "Token'ı localStorage'dan 'token' adıyla mı alacağım?"
    // Varsayım: localStorage.getItem('token')
    const token = localStorage.getItem('token');
    
    if (token) {
      // Eğer token varsa, her isteğin header'ına ekle
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // İstek gönderilirken bir hata olursa burası çalışır
    return Promise.reject(error);
  }
);

// 3. ⬅️ Response Interceptor (Her cevap GELDİKTEN sonra çalışır)
// AUTH KİŞİSİ İÇİN
axiosInstance.interceptors.response.use(
  (response) => {
    // 2xx (başarılı) durum kodlarında burası çalışır
    return response;
  },
  (error) => {
    // 2xx DIŞINDAKİ (hatalı) durum kodlarında burası çalışır
    const { status } = error.response;

    // --- AUTH KİŞİSİ İÇİN ---
    // "Token'ın geçersiz (401) olduğunda hangi fonksiyonu tetiklemeliyim?"
    // "AuthContext içindeki 'logout' fonksiyonunu mu?"
    
    if (status === 401) {
      // Varsayım: Kullanıcıyı sistemden at (logout) ve login sayfasına yönlendir.
      localStorage.removeItem('token'); // Geçersiz token'ı temizle
      
      // AUTH KİŞİSİ İÇİN AuthContext'i bu yönlendirmeyi otomatik yapmıyorsa
      // biz manuel olarak yapmalıyız.
      window.location.href = '/login'; 
      
      console.error("Yetkisiz işlem veya token süresi doldu. Girişe yönlendiriliyor.");
    }

    return Promise.reject(error);
  }
);

// 4. Oluşturduğumuz bu instance'ı projenin kalanı için export et
export default axiosInstance;