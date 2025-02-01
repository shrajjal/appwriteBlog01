import conf from "../conf/conf.js";
import {Client, ID, Databases, Query, Storage} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
           .setEndpoint('https://cloud.appwrite.io/v1')
           .setProject('672125b300124cb98dce');
        this.databases = new Databases(this.client);
        this.bucket=new Storage(this.client);   
    }

    async createPost({title,slug,content,featuredImage,status,userId}){

        try {
            return await this.databases.createDocument(
                '672128b40035492ef990',
                '6721290200029c621887',
                slug,
                {
                    title,
                    content,
                    featuredimage: featuredImage,
                    status,
                    userid:userId
                }
            );
        } catch (error) {
            console.log("Appwrite service ::createPost ::error", error);
            console.log("featuredImage:", featuredImage);
            console.log("userId:", userId);

            
        }

    }

    async updatePost(slug,{title,content,featuredImage,status,userId}){
        try {
            return await this.databases.updateDocument(
                
                '672128b40035492ef990',
                '6721290200029c621887',
                slug,
                {
                   title,
                   content,
                   featuredImage,
                   status  
                }

            )
            
        } catch (error) {

            console.log("Appwrite service ::UpdatePost ::error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                '6721290200029c621887',
                '672128b40035492ef990',
                slug
            )
            return true;
        } catch (error) {
            
            console.log("Appwrite service ::deletePost ::error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                
                '672128b40035492ef990',
                '6721290200029c621887',
                slug
            )
        } catch (error) {
            console.log("Appwrite service ::getPost ::error", error);
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
       try {
        return await this.databases.listDocuments(
            '672128b40035492ef990', //DatabaseId
            '6721290200029c621887', //CollectionId
            queries
        )
        
       } catch (error) {
        console.log("Appwrite service ::getPosts ::error", error);
        
       }
    }

    // file upload

    async uploadFile(file){
        try {
            return await  this.bucket.createFile(
                '67212abc002e64a2704d',
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service ::uploadFile ::error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                '67212abc002e64a2704d',
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service ::uploadFile ::error", error);
            return false
            
        }
    }

    getFilePreview(fileid) {
        if (!fileid) {
            console.error("getFilePreview error: dekho fileId is missing!");
            return null; // Prevents calling Appwrite API with undefined fileId
        }
        return this.bucket.getFilePreview('67212abc002e64a2704d', fileid);
    }
}



const service = new Service();
export default service