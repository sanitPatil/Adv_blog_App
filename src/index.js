import { config } from './config/config';
//-----------------------------------------------------//
import authService from './appwrite/authService';
import storageService from './appwrite/storageService';
//-----------------------------------------------------//
import { Container } from './components/Elements/Container';
//-----------------------------------------------------//

import Register from './components/services/Register';
import Login from './components/services/Login';
import UserProfile from './components/services/UserProfile';
import Navbar from './components/services/Navbar';
import BlogAppLogo from './components/services/BlogAppLogo';
import Footer from './components/services/Footer';

import AuthLayout from './components/services/AuthLayout';
export {
  AuthLayout,
  Footer,
  BlogAppLogo,
  Navbar,
  config,
  authService,
  storageService,
  Register,
  Container,
  Login,
  UserProfile,
};
