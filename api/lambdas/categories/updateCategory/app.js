let response;
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.lambdaHandler = async (event) => {
    try {
        const categoryTable = process.env.CATEGORY_TABLE_NAME;
        if (event.httpMethod !== 'PUT') {
            throw new Error(`updateCategory only accepts PUT method, you tried: ${event.httpMethod} method.`);
        }
        // Writing logs to CloudWatch
        console.info('received:', event);
        // Get id and name from the body of the request
        const body = JSON.parse(event.body);
        const categoryId = event.pathParameters.CategoryId;
        const categoryName = body.CategoryName;
        console.log('***********************Update Attributes*******************');
        console.log(body);
        console.info('CategoryId:', categoryId);
        console.info('CategoryName:', categoryName);
        console.log(categoryName);
        var params = {
            TableName: categoryTable,
            Key: {
                categoryId: categoryId
            },
            UpdateExpression: "set categoryName = :cn",
            ExpressionAttributeValues: {
                ":cn": categoryName,
            },
            ReturnValues: "UPDATED_NEW"
        };
        const result = await docClient.update(params).promise();
        console.log(result.Attributes);
        const response = {
            statusCode: 200,
            body: JSON.stringify(result)
        };
        // Writing logs to CloudWatch
        console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}