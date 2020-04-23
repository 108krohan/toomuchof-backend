const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
// https://stackoverflow.com/questions/57906632/lambda-code-works-on-node-v8-10-but-not-nodejs-v10-x
// https://stackoverflow.com/questions/52040153/generating-a-unique-key-for-dynamodb-within-a-lambda-function
// mode version: node -v
// output: v13.13.0
// const {"v4": uuidv4} = require('uuid');
// context.awsRequestId; can be used.
const TABLE_NAME = "Counter";
const PRIMARY_KEY = "counterId";
const RESERVED_RESPONSE = `Error: You're using AWS reserved keywords as attributes`,
    DYNAMODB_EXECUTION_ERROR = `Error: Execution update caused a Dynamodb error, please take a look at your CloudWatch Logs.`;
/*
 * This handler creates a new counter and stores in dynamo.
 * Sample request: { "counterId" : "1-frontpage-ringer"}
 */
export const postHandler = async (event: any = {}) : Promise <any> => {
    if (!event.body) {
        return { statusCode: 400, body: 'Invalid request, you are missing the parameter body.' };
    }
    // get counter item as type of counter to update.
    // this way i can have multiple counters based on use-case.
    console.log(event);
    const item = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
    item["counterValue"] = 0;
    const params = {
        TableName: TABLE_NAME,
        Item: item
    };
    try {
        await dynamo.put(params).promise();
        return { statusCode: 201, body: '' };
    } catch (dbError) {
        const errorResponse = dbError.code === 'ValidationException' && dbError.message.includes('reserved keyword') ?
            DYNAMODB_EXECUTION_ERROR : RESERVED_RESPONSE;
        return { statusCode: 500, body: errorResponse };
    }
};
