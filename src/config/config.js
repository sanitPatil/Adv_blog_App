export const config = {
  appwrite_endpoint: String(import.meta.env.VITE_APPWRITE_PROJECT_ENDPOINT),
  appwrite_project: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwrite_db: String(import.meta.env.VITE_APPWRITE_PROJECT_DB),
  appwrite_user: String(
    import.meta.env.VITE_APPWRITE_PROJECT_USER_USER_COLLECTION
  ),
  appwrite_blog: String(
    import.meta.env.VITE_APPWRITE_PROJECT_USER_BLOG_COLLECTION
  ),
  appwrite_bucket: String(import.meta.VITE_APPWRITE_PROJECT_BUCKET),
};
