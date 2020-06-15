
var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
});
var uuid = require('uuid');
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.lambdaHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`CreateNewCategory only accept POST method, you tried: ${event.httpMethod}`);
    }
    console.log(event);
    const categoryTable = process.env.CATEGORY_TABLE_NAME;

    var params = {
        TableName: categoryTable,
        Item: {
            categoryId: uuid.v4(),
            createdAt: new Date().toISOString(),
            categoryName: JSON.parse(event.body).CategoryName
        }
    };
    try {
        console.log("Creating a new Category...");
        const result = await docClient.put(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        };
        // Writing logs to CloudWatch
        console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}