import { Client, Databases, ID, Storage } from 'appwrite';
import { config } from '../index';
class StorageService {
  client = new Client();
  constructor() {
    this.client
      .setEndpoint(config.appwrite_endpoint)
      .setProject(config.appwrite_project);

    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // user service
  // 1. set USER PROFILE
  async setUserProfile(userId, data) {
    try {
      return await this.database.createDocument(
        config.appwrite_db,
        config.appwrite_user,
        ID.unique(),
        {
          userId: userId,
          ...data,
        }
      );
    } catch (error) {
      console.log(`set Profile Error::ERROR::${error.message}`);
    }
  }

  // user service
  // 2. get USER PROFILE

  async getUserProfile(id) {
    try {
      return this.database.getDocument(
        config.appwrite_db,
        config.appwrite_user,
        id
      );
    } catch (error) {
      console.log(`get Profile Error::ERROR::${error.message}`);
    }
  }

  // user service
  // 3. delete USER PROFILE

  async delUserProfile(id) {
    try {
      return this.database.deleteDocument(
        config.appwrite_db,
        config.appwrite_user,
        id
      );
    } catch (error) {
      console.log(
        `failed to delete user Profile Error::ERROR::${error.message}`
      );
    }
  }

  // user service
  // 4. update USER PROFILE
  async updateUserProfile(id, data) {
    try {
      return this.database.deleteDocument(
        config.appwrite_db,
        config.appwrite_user,
        id,
        {
          //  userid same
          //   username change
          //   bio change
          //   profile picture
          //   name
          ...data,
        }
      );
    } catch (error) {
      console.log(
        `failed to delete user Profile Error::ERROR::${error.message}`
      );
    }
  }
}

const storageService = new StorageService();
export default storageService;
