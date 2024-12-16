import AWS from "aws-sdk";
import { User, UserFormData } from "../../shared/types";

const fs = require('fs')
const { v4 } = require('uuid');

export const getUsersAsObject = (): User[] => {
    const db = JSON.parse(fs.readFileSync('./mock-db.json').toString());
    return db.users;
}

export const isUserExists = (email: string): User | undefined => {
    const users = getUsersAsObject();
    return users.find((user: User) => user.email === email);
}

export const saveNewUser = async(userObject: UserFormData) => {

    try {
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
        const params = {
          TableName: 'Users',
          Item: {
              ...userObject,
              createdAt: new Date().toISOString(),
          },
        };
        await dynamoDB.put(params).promise();
    }
    catch(error){
        throw error
    }
};

