import { Client, Account, Databases } from 'appwrite'

const client = new Client()

client.setEndpoint("https://cloud.appwrite.io/v1").setProject('67b6e2ee001a065c336d')
export const account = new Account(client)
export const databases = new Databases(client)