import AWS from "aws-sdk";
import { ArtworkForm } from "../../shared/types";
import { v4 as uuidv4 } from 'uuid';

type UpdateExpressionResult = {
    UpdateExpression: string;
    ExpressionAttributeNames: Record<string, string>;
    ExpressionAttributeValues: Record<string, any>;
};


export const saveArtwork = async (artForm: ArtworkForm) => {
    const id = uuidv4();
    const fullArtWork = { ...artForm, id, createdAt: new Date().toISOString(), }
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const artworkres = await dynamoDB.put({
        TableName: 'Artworks',
        Item: fullArtWork,

    }).promise()
    console.log(artworkres)
    return fullArtWork
}

export const getAllArtworks = async () => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    return await dynamoDB.scan({ TableName: 'Artworks' }).promise()
}

export const getArtworkById = async (id: string) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    return await dynamoDB.get({ TableName: 'Artworks', Key: { id } },).promise()

}
export const deleteArtworkById = async (id: string) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    return await dynamoDB.delete({ TableName: 'Artworks', Key: { id } }).promise();
}



const generateUpdateExpression = (object: Record<string, any>): UpdateExpressionResult => {
    let updateExpression = 'SET';
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    // Iterate over the object keys to build the expressions
    Object.keys(object).forEach((key, index) => {
        const placeholderName = `#${key}`;
        const placeholderValue = `:${key}`;

        // Add to the update expression
        updateExpression += ` ${placeholderName} = ${placeholderValue}`;
        if (index < Object.keys(object).length - 1) {
            updateExpression += ','; // Add comma for all but the last item
        }

        // Map the attribute name and value placeholders
        //@ts-ignore
        expressionAttributeNames[placeholderName] = key;
        //@ts-ignore
        expressionAttributeValues[placeholderValue] = object[key];
    });

    return {
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
    };
};



export const editArtwork = async (id: string, updatedFields: Partial<ArtworkForm>) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues } = generateUpdateExpression(updatedFields);
    return await dynamoDB.update({
        TableName: 'Artworks', Key: { id },
        UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues
    }).promise();
}