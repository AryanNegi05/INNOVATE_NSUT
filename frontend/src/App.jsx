import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LFHomePage from './pages/LFHomePage';
import AddItemPage from './pages/AddItemPage';
import LostItemPage from './pages/LostItem';
import HomePage from './pages/HomePage'
// import ItemPage from './components/ItemPage';
// import ListingPage from './components/ListingPage';
// import RequestsPage from './components/RequestsPage';
import Navbar from './pages/NavigationBar';
import LoginForm from './pages/Login';
import SignupForm from './pages/SignUp';
import MasterPage from './pages/MasterPage'

// Create a black and white theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f8f8',
    },
    text: {
      primary: '#000000',
      secondary: '#444444',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

function App() {
  const [Email,setEmail]=useState("dummy@gmail.com");
  useEffect(()=>{
    setEmail(localStorage.getItem('email'));
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/masterpage" element={<MasterPage Email={Email}/>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;