const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Counter";
const PRIMARY_KEY = "counterId";
const RESERVED_RESPONSE = `Error: You're using AWS reserved keywords as attributes`,
    DYNAMODB_EXECUTION_ERROR = `Error: Execution update, caused a Dynamodb error, please take a look at your CloudWatch Logs.`;
/*
 * This handler updates an existing counter in the dynamo table
 * Sample request: ?counterId=1-frontpage-ringer&increment=1
 */
export const updateOneHandler = async (event: any = {}) : Promise <any> => {
    const requestedItemId = event.pathParameters.counterId;
    const requestedItemIncrement = event.pathParameters.increment;
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.03
    const params = {
        TableName: TABLE_NAME,
        Key: {
            [PRIMARY_KEY]: requestedItemId
        },
        UpdateExpression: 'ADD counterValue = :c',
        ExpressionAttributeValues: {
            ':c': {
                N: requestedItemIncrement
            }
        },
        ReturnValues: 'UPDATED_NEW'
    };
    try {
        await db.update(params).promise();
        return { statusCode: 204, body: '' };
    } catch (dbError) {
        const errorResponse = dbError.code === 'ValidationException' && dbError.message.includes('reserved keyword') ?
            DYNAMODB_EXECUTION_ERROR : RESERVED_RESPONSE;
        return { statusCode: 500, body: errorResponse };
    }
};
