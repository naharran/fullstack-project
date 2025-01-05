import AWS from "aws-sdk";
import { UserFormData } from "../../shared/types";


export const saveNewUser = async(userObject: UserFormData) => {
    try {
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
        return await dynamoDB.put({
            TableName: 'Users',
            ConditionExpression: 'attribute_not_exists(email)', 
            Item: {
                ...userObject,
                createdAt: new Date().toISOString(),
            },
          }).promise();
    }
    catch(error: any){
        if (error.code === 'ConditionalCheckFailedException') {
            console.error('Conditional check failed:', error.message);
        }
        throw error
    }
};

