import { Account, Client, ID } from 'appwrite';
import { config } from '../index';
class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwrite_endpoint)
      .setProject(config.appwrite_project);

    this.account = new Account(this.client);
  }

  //1. register
  async register({ name, email, password }) {
    try {
      return await this.account.create(ID.unique(), email, password, name);
    } catch (error) {
      console.log(`Registration Error::${error.message}`);
      return false;
    }
  }

  //2 .login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(`Login Error::${error.message}`);
      return false;
    }
  }

  //3. logout
  async LogOut() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log(`LogOut Error::LogOut Func::${error.message}`);
      return false;
    }
  }

  //4. get current login user
  async getCurrentLogin() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(
        `getCurrentLogin Error::getCurrentLogin Func::${error.message}`
      );
      return false;
    }
  }

  // 5. update Email

  async updateEmail({ email, password }) {
    try {
      return await this.account.updateEmail(email, password);
    } catch (error) {
      console.log(`Update-Email Error::Update-Email Func::${error.message}`);
      return false;
    }
  }
  // 6. update Name
  async updateUserName({ userName }) {
    try {
      return await this.account.updateName(userName);
    } catch (error) {
      console.log(
        `Update-User-Name Error::Update-User-Name Func::${error.message}`
      );
      return false;
    }
  }

  // 5. update Password
  async updateUserPassword({ password, oldPassword }) {
    try {
      return await this.account.updatePassword(password, oldPassword);
    } catch (error) {
      console.log(
        `Update-Password Error::Update-Password Func::${error.message}`
      );
      return false;
    }
  }

  // 6. delete Account
  async deleteAccount(userId) {
    try {
      return await this.account.deleteIdentity(userId);
    } catch (error) {
      console.log(
        `Delete Identity Error::Delete Identity Func::${error.message}`
      );
      return false;
    }
  }
}

const authService = new AuthService();

export default authService;
