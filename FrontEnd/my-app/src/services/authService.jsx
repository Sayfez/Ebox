/*import axios from 'axios';

const API_URL = 'http://localhost:3003/authentification';

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, { email, password }, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signUp = async (userData) => {
  try {
    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });
    const response = await axios.post(`${API_URL}/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    await axios.get(`${API_URL}/logout`, { withCredentials: true });
  } catch (error) {
    throw error.response.data;
  }
};

export const refreshTokens = async () => {
  try {
    const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}; */
////////////////////////////////////////////////////////////////////////////////////////////////// 
/*
import axios from 'axios';

const API_URL = 'http://localhost:3003'; // Your backend API URL

class AuthenticationService {
  // Login method
  login(email, password) {
    return axios
      .post(`${API_URL}/authentification/signin`, { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          // Store access token in local storage
          localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
        }
        return response.data;
      });
  }

  // Logout method
  logout() {
    // Remove access token from local storage
    localStorage.removeItem('accessToken');
  }

  // Check if user is logged in
  isLoggedIn() {
    // Check if access token exists in local storage
    return localStorage.getItem('accessToken') !== null;
  }

  // Get current user
  getCurrentUser() {
    // Get access token from local storage
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    if (accessToken) {
      // Decode access token to extract user data (e.g., user ID, email)
      const decodedToken = parseJwt(accessToken);
      return decodedToken;
    }
    return null;
  }
}

// Function to parse JWT token and extract payload
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
    return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
  }).join(''));

  return JSON.parse(jsonPayload);
}

export default new AuthenticationService();
*/////////////////////////////////////////////////////////////////////////////////////////////////////////
// services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3003'; // Your backend API URL

class AuthenticationService {
  // Login method
  async login(Email, Password) {
    console.log('Login request payload:', { Email, Password });
    try {
      const response = await axios.post(`${API_URL}/authentification/signin`, { Email, Password });
      console.log('response:',JSON.stringify(response))
      if (response.data) {
        localStorage.setItem('accessToken', response.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        localStorage.setItem('user', response.data.user.role); //
        localStorage.setItem('Iduser', response.data.user._id);  // save user
        console.log('methode login:',response.data.user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.tokens.accessToken}`;
        
      }
      return response.data;
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  }

  // Logout method
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user'); //
    localStorage.removeItem('Iduser');
    delete axios.defaults.headers.common['Authorization'];
  }

  // Check if user is logged in
  isLoggedIn() {
    return localStorage.getItem('accessToken') !== null;
  }

  // Get current user
  getCurrentUser() {
    const accessToken = localStorage.getItem('accessToken');
    console.log('local storage',localStorage)
    console.log('user',localStorage.getItem('user'))
    if (accessToken) {
      //const decodedToken = this.parseJwt(accessToken);
      //const decodedToken = JSON.parse(accessToken);
      //return decodedToken;  //localStorage.getItem('iduser');
      return localStorage.getItem('user');
    }
    return null;
  }

  // Get current user's role
  getUserRole() {
    const currentUser = this.getCurrentUser();
    console.log('currentuser',JSON.stringify(currentUser))
    if (currentUser) {
      return currentUser;
    }
    return null;
  }

  // Function to parse JWT token and extract payload
  parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  // Method to refresh tokens
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await axios.get(`${API_URL}/authentification/refresh`, {
        headers: { 'Authorization': `Bearer ${refreshToken}` }
      });
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      }
      return response.data;
    } catch (error) {
      console.error('Token refresh error', error);
      throw error;
    }
  }

  // Automatically refresh token before it expires
  setupAutoRefresh() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = this.parseJwt(accessToken);
      const expirationTime = decodedToken.exp * 1000 - Date.now() - 60000; // Refresh 1 minute before expiration
      setTimeout(() => {
        this.refreshToken().then(() => {
          this.setupAutoRefresh(); // Set up the next refresh
        });
      }, expirationTime);
    }
  }

  
}

export default new AuthenticationService();
