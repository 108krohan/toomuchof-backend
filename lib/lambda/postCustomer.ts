const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Customer";
const PRIMARY_KEY = "name"; // for reference purpose.
const SORT_KEY = "dob"; // for reference purpose.
const RESERVED_RESPONSE = `Error: You're using AWS reserved keywords as attributes`,
    DYNAMODB_EXECUTION_ERROR = `Error: Execution update caused a Dynamodb error, please take a look at your CloudWatch Logs.`;
/*
 * This handler creates a new customer record and stores in dynamo.
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
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    item["createDate"] = mm + '/' + dd + '/' + yyyy;
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
