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

  //  *******************************************************************************
  //  *****************************USER-PROFILE**************************************

  async setUserProfile(data) {
    if (!data) return 'data is emplty';
    try {
      const res = await this.database.createDocument(
        config.appwrite_db,
        config.appwrite_user,
        ID.unique(),
        data
      );
      console.log('user-profile-setup successfully.');
      return res;
    } catch (error) {
      console.log('Appwrite serive :: user-profile-setup :: error', error);
    }
  }

  async getUserProfile(userId) {
    try {
      const res = await this.database.listDocuments(
        config.appwrite_db,
        config.appwrite_user,
        [Query.equal('userId', [`${userId}`])]
      );
      return res;
    } catch (error) {
      console.log('Appwrite serive :: get-user-profile :: error', error);
    }
  }

  async delUserProfile(id) {
    try {
      return this.database.deleteDocument(
        config.appwrite_db,
        config.appwrite_user,
        id
      );
    } catch (error) {
      console.log('Appwrite serive :: delete-user-profile :: error', error);
    }
  }

  async updateUserProfile(id, data) {
    try {
      return this.database.updateDocument(
        config.appwrite_db,
        config.appwrite_user,
        id,
        {
          ...data,
        }
      );
    } catch (error) {
      console.log('Appwrite serive :: update-user-profile :: error', error);
      return false;
    }
  }

  //  *******************************************************************************
  //  *************************************BLOG**************************************

  async createBlog({
    userId,
    featuredImage,
    isPublished,
    category,
    content,
    title,
  }) {
    try {
      return await this.database.createDocument(
        config.appwrite_db,
        config.appwrite_blog,
        ID.unique(),
        { userId, featuredImage, isPublished, category, content, title }
      );
    } catch (error) {
      console.log('Appwrite serive :: create-blog :: error', error);
      return false;
    }
  }

  async getBlog(id) {
    try {
      return this.database.getDocument(
        config.appwrite_db,
        config.appwrite_blog,
        id
      );
    } catch (error) {
      console.log('Appwrite serive :: get-blog:: error', error);
      return false;
    }
  }

  async updateBlog(
    id,
    { userId, featuredImage, isPublished, category, content, title }
  ) {
    try {
      return this.database.updateDocument(
        config.appwrite_db,
        config.appwrite_blog,
        id,
        { userId, featuredImage, isPublished, category, content, title }
      );
    } catch (error) {
      console.log('Appwrite serive :: update-blog :: error', error);
      return false;
    }
  }

  async deleteBlog(id) {
    try {
      return this.database.deleteDocument(
        config.appwrite_db,
        config.appwrite_blog,
        id
      );
    } catch (error) {
      console.log('Appwrite serive :: delete-blog :: error', error);
      return false;
    }
  }
  async getBlogList() {
    try {
      return await this.database.listDocuments(
        config.appwrite_db,
        config.appwrite_blog
      );
    } catch (error) {
      console.log('Appwrite serive :: get-blog-list :: error', error);
      return false;
    }
  }

  async getBlogListCategaryWise(category) {
    try {
      return await this.database.listDocuments(
        config.appwrite_db,
        config.appwrite_blog,
        [Query.equal('category', [`${category}`])]
      );
    } catch (error) {
      console.log(
        'Appwrite serive :: get-blog-list-category-wise :: error',
        error
      );
      return false;
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
      console.log('Appwrite serive :: check-user-name-exists :: error', error);
      return false;
    }
  }

  //  *******************************************************************************
  //  *****************************FILE-MANAGEMENT**************************************

  async uploadFile(file) {
    if (!file) {
      return false;
    }
    try {
      const res = await this.bucket.createFile(
        config.appwrite_bucket,
        ID.unique(),
        file
      );
      console.log('upload successfull UPLOADFILE');
      return res;
    } catch (error) {
      console.log('Appwrite serive :: upload-file :: error', error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(config.appwrite_bucket, fileId);
    } catch (error) {
      console.log('Appwrite serive :: delete-file :: error', error);
      return false;
    }
  }

  async getFile(fileId) {
    try {
      const res = await this.bucket.getFile(config.appwrite_bucket, fileId);
      console.log(res);
      return res;
    } catch (error) {
      console.log('Appwrite serive :: get-file :: error', error);
      return false;
    }
  }

  async fileUpdate(file) {
    try {
      return await this.bucket.createFile(
        config.appwrite_bucket,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log('Appwrite serive :: update-file :: error', error);
      return false;
    }
  }

  async previewFile(fileId) {
    try {
      const res = this.bucket.getFilePreview(config.appwrite_bucket, fileId);
      return res;
    } catch (error) {
      console.log('Appwrite serive :: get-file-preview :: error', error);
      return false;
    }
  }
}
const storageService = new StorageService();
export default storageService;
