let response;
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.lambdaHandler = async (event) => {
    try {
        const businessTable = process.env.BUSINESS_TABLE_NAME;

        if (event.httpMethod !== 'PUT') {
            throw new Error(`updateExistingBusiness only accepts PUT method, you tried: ${event.httpMethod} method.`);
        }
        // Writing logs to CloudWatch
        console.info('received:', event);

        // Get id and name from the body of the request
        const body = JSON.parse(event.body)
        const businessId = event.pathParameters.BusinessId;
        const name = body.name;

        var params = {
            TableName: tableName,
            Item: {
                id: id,
                name: name
            }
        };

        const result = await docClient.put(params).promise();

        const response = {
            statusCode: 200,
            body: JSON.stringify(body)
        };

        // Writing logs to CloudWatch
        console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}