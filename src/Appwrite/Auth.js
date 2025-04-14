import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf.js';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setProject(conf.appwriteProjectId)
            .setEndpoint(conf.appwriteUrl);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                console.log(userAccount)
                return this.login({email, password})
                
            } else {
               return  userAccount;
            }
           
        } catch (error) {
            throw error;
        };
    }

    async login({ email, password }) {
        try {
             const session = this.account.createEmailPasswordSession(email, password);
             console.log(session)
             if (session) {
                return session
             }
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {

            return await this.account.get();
        } catch (error) {
            console.log("appwrite : getCurrentUser error", error);
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite : logout error", error);
        }
    }
};



const authService = new AuthService();
export default authService;