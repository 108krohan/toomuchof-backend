const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Counter";
const PRIMARY_KEY = "counterId";
/*
 * This handler gets an existing counter in the dynamo table.
 * Sample request: ?counterId=1-frontpage-ringer
 */
export const getOneHandler = async (event: any = {}) : Promise <any> => {
    console.log("request:", JSON.stringify(event, undefined, 2));
    const requestedItemId = event.pathParameters.counterId;
    if (!requestedItemId) {
        return { statusCode: 400, body: `Error: You are missing the path parameter id` };
    }
    const params = {
        TableName: TABLE_NAME,
        Key: {
            [PRIMARY_KEY]: requestedItemId
        }
    };
    try {
        const response = await dynamo.get(params).promise();
        console.log("consumed capacity = " + response.consumedCapacity);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000"
            },
            body: JSON.stringify(response.Item.counterValue)
        };
    } catch (dbError) {
        return { statusCode: 500, body: JSON.stringify(dbError) };
    }
};
