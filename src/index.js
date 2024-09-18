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

export {
  config,
  authService,
  storageService,
  Register,
  Container,
  Login,
  UserProfile,
};
