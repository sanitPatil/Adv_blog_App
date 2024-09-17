import { Client, Databases, ID, Query, Storage } from 'appwrite';
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
        `failed to update user Profile Error::ERROR::${error.message}`
      );
    }
  }

  //----------------BLOG SERIVCES ------------------------------//

  // 1. create BLOG
  async createBlog({ data }) {
    try {
      return await this.database.createDocument(
        config.appwrite_db,
        config.appwrite_blog,
        ID.unique(),
        {
          ...data,
        }
      );
    } catch (error) {
      console.log(`create BLOG ERROR::ERROR::${error.message}`);
    }
  }
  // 2. get BLOG // universal call
  async getBlog(id) {
    try {
      return this.database.getDocument(
        config.appwrite_db,
        config.appwrite_blog,
        id
      );
    } catch (error) {
      console.log(`get BLOG ERROR::ERROR::${error.message}`);
    }
  }

  //3. update BLOG
  async updateBlog(id, { data }) {
    try {
      return this.database.updateDocument(
        config.appwrite_db,
        config.appwrite_blog,
        id,
        {
          ...data,
        }
      );
    } catch (error) {
      console.log(`create POST ERROR::ERROR::${error.message}`);
    }
  }

  // 4. delete POST
  async deleteBlog(id) {
    try {
      return this.database.deleteDocument(
        config.appwrite_db,
        config.appwrite_blog,
        id
      );
    } catch (error) {
      console.log(`delete BLOG ERROR::ERROR::${error.message}`);
    }
  }

  // get all blog post
  async getBlogList() {
    try {
      return await this.database.listDocuments(
        config.appwrite_db,
        config.appwrite_blog
      );
    } catch (error) {
      console.log(`failed to get blog list::ERROR::${error.message}`);
    }
  }

  // get post category wise
  async getBlogListCategaryWise(category) {
    try {
      return await this.database.listDocuments(
        config.appwrite_db,
        config.appwrite_blog,
        [Query.equal('category', [`${category}`])]
      );
    } catch (error) {
      console.log(`failed to fetch data::blog-category::${error.message}`);
    }
  }

  async checkUserName(username) {
    try {
      return this.database.listDocuments(
        config.appwrite_db,
        config.appwrite_user,
        [Query.equal('userName', username)]
      );
    } catch (error) {
      console.log(`failed::ERROR${error.message}`);
    }
  }
  // bucket
  //1. create file
  async createFile(filePath) {
    try {
      if (!filePath) return false;
      return await this.bucket.createFile(config.appwrite_bucket, filePath);
    } catch (error) {
      console.log(`failed to create bucket file::ERROR::${error.message}`);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(config.appwrite_bucket, fileId);
    } catch (error) {
      console.log(`failed to delete bucket file::ERROR::${error.message}`);
    }
  }

  async getFile(fileId) {
    try {
      return await this.bucket.getFile(config.appwrite_bucket, fileId);
    } catch (error) {
      console.log(`failed to get bucket file::ERROR::${error.message}`);
    }
  }

  async updateFile({ fileId, filePath }) {
    try {
      if (!fileId || !filePath) return false;
      const res = await this.bucket.deleteFile(config.appwrite_bucket, fileId); //
      if (!res) {
        return false;
      }
      const uploadRes = await this.bucket.createFile(
        config.appwrite_bucket,
        fileId,
        filePath
      );
      if (!uploadRes) {
        return false;
      }

      return uploadRes;
    } catch (error) {
      console.log(`failed to update bucket file::ERROR::${error.message}`);
    }
  }

  async getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(config.appwrite_bucket, fileId);
    } catch (error) {
      console.log(`failed file preview::ERROR::$${error.message}`);
    }
  }

  // checking username exists or not
}

// advance
// comments , like,

// dashboard, analytics
// admin panel

// bucket
//1. create file
const storageService = new StorageService();
export default storageService;
