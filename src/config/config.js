export const config = {
  appwrite_endpoint: String(import.meta.env.VITE_APPWRITE_PROJECT_ENDPOINT),
  appwrite_project: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwrite_db: String(import.meta.env.VITE_APPWRITE_PROJECT_DB),
  appwrite_users: String(
    import.meta.env.VITE_APPWRITE_PROJECT_COLLECTION_USERS
  ),
  appwrite_articles: String(
    import.meta.env.VITE_APPWRITE_PROJECT_COLLECTION_ARTICLES
  ),
};
