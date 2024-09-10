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
  async register({ email, password, userName }) {
    try {
      return await this.account.create(ID.unique(), email, password, userName);
    } catch (error) {
      console.log(`Registration Error::Register Func::${error.message}`);
    }
  }

  //2 .login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(`Login Error::Login Func::${error.message}`);
    }
  }

  //3. logout
  async LogOut() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log(`LogOut Error::LogOut Func::${error.message}`);
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
    }
  }

  // 5. update Email

  async updateEmail({ email, password }) {
    try {
      return await this.account.updateEmail(email, password);
    } catch (error) {
      console.log(`Update-Email Error::Update-Email Func::${error.message}`);
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
    }
  }
}

const authService = new AuthService();

export default authService;
