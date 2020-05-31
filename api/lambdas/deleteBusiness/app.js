
let response;
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();


exports.lambdaHandler = async (event) => {
    if (event.httpMethod !== 'DELETE') {
      throw new Error(`DeleteBusiness only accept DELETE method, you tried: ${event.httpMethod}`);
    }
    // Writing logs to CloudWatch
    console.info('received:', event);

    const businessTable = process.env.BUSINESS_TABLE_NAME;
    const businessId = event.pathParameters.BusinessId;
    var params = {
        TableName:businessTable,
        Key:{
            "BusinessId": businessId
        }
    };
    //perform delete operation
    const data = await docClient.delete(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(
      {
          message: "Successfully deleted business item",
          businessId: businessId
      })
    };
    // Writing logs to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
  }
  