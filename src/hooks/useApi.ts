import axios, { AxiosInstance } from "axios";
import { getRefreshToken, logOut } from "../services/auth";

export function useApi() {

  const headers = {
    "Content-Type": "application/json",
    "Access-control-Allow-Origin": 'http://localhost:5173',
  };

  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers
  });

// Traitement de l'envoi
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken")
    if (token && token !== undefined && token !== null) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  });

// Traitement du retour
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        const originalRequest = error.config;
        // Eviter les boucles infinis du refreshToken
        if (!originalRequest._retry ) {
          originalRequest._retry = true;
        }
        const refreshToken = localStorage.getItem('authRefreshToken');
        if ( !refreshToken ) {
          // Supprimer tous les Tokens du localstorage
          await logOut()
          window.location.href = "/login"
        }
        try {
          // Demande une nouvelle paire de token au back
          const result = await getRefreshToken(refreshToken);
          if ( result.status === false ) {
            throw {status: false, data: result.data.response}
          }
          // Enregistre les nouveaux Tokens
          localStorage.setItem("authToken", result.data.authToken);
          localStorage.setItem("authRefreshToken", result.data.authRefreshToken);
          // Paramétre et Renvoi de la requête originale
          originalRequest.headers['Authorization'] = `Bearer ${result.data.authToken}`;
          console.log("SUCCESS : originalRequest send after refresh")
          return axios(originalRequest);
        } catch (error: any) {
          if ( error.status !== false || error.status === undefined ) {
            console.log("CATCH :", error)
            // Supprimer tous les Tokens du localstorage
            await logOut()
            window.location.href = "/login"
          } else {
            console.log("CATCH ERROR :", error.data.data.error)
          }
        }
      }
      if (error.response && error.response.status === 500) {
        console.log("Error 500 :", error.response)
      }
      return Promise.reject(error)
    }
  );
  return api
}