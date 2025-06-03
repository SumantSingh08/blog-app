import { Client, ID, Databases, Storage, Query, Permission, Role } from "appwrite";
import conf from "../conf/conf";
// query is used to filter, sort, and paginate data
export class DatabaseService {
    client = new Client();
    database;
    storage;

    constructor() {
        this.client

            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    };

    //  post service
    async creatPost({ title, slug, content, status, featuredImage, userId }) {
        try {
            return await this.database.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                status,
                featuredImage,
                userId
            },
                

            )
        } catch (error) {
            console.log("appwrite : post :error", error);
        }
    };

    async updatePost(slug, { title, content, status, featuredImage }) {
        try {
            return await this.database.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                status,
                featuredImage
            })
        } catch (error) {
            console.log("appwrite : updatePost : error", error)

        }
    };

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
            return true;
        } catch (error) {
            console.log("appwrite : deletePost : error", error);
            return false;
        }
    };

    async getPost(slug) {
        try {
            return await this.database.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log("appwrite : getPost : error", error);
            return false;
        }
    };

    async getPosts(userId) {
        try {
            return this.database.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, [Query.equal("userId", [userId])],

            )
        } catch (error) {
            console.log("appwrite : getPosts : error", error);
            return false;
        }
    };

    // file uplode service
    async uploadFile(file, userId) {
        try {
            const storageData = await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file,

             
            )

            if (storageData) {

                return storageData;
            }
        } catch (error) {
            console.log("appwrite : uploadeFile : error", error);
            return false;

        }
    };

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(conf.appwriteBucketId, fileId)
            return true;
        } catch (error) {
            console.log("appwrite : deleteFile : error", error);
            return false;

        }
    };

    getFilePreview(fileId) {
        try {
            const result = this.storage.getFileView(conf.appwriteBucketId, fileId)
            console.log("getFilePreview", result);
            if (result) {
                return result;
            }

        } catch (error) {
            console.log("appwrite : getfilePreviw : error", error);
            return false;

        }
    }
}

const databaseService = new DatabaseService();
export default databaseService;