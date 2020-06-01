let response;
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.lambdaHandler = async (event, context) => {
    const businessTable = process.env.BUSINESS_TABLE_NAME;
    try {
        if (event.httpMethod !== 'GET') {
            throw new Error(`getBusinessById only accept GET method, you tried: ${event.httpMethod}`);
        }
        // Writing logs to CloudWatch
        console.info('received:', event);
        const businessId = event.pathParameters.BusinessId;

        var params = {
            TableName:businessTable,
            Key:{
                "BusinessId": businessId
            }
        };
        const data = await docClient.get(params).promise();
        console.log('**************************');
        console.log(data);

        const item = data.Item;

        const response = {
            statusCode: 200,
            body: JSON.stringify(item)
        };

        // Writing logs to CloudWatch
        console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
        return response;

    } catch (err) {
        console.log(err);
        return err;
    }
};