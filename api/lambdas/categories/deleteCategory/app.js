
let response;
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();


exports.lambdaHandler = async (event) => {
    if (event.httpMethod !== 'DELETE') {
      throw new Error(`DeleteCategory only accept DELETE method, you tried: ${event.httpMethod}`);
    }
    // Writing logs to CloudWatch
    console.info('received:', event);

    const categoryTable = process.env.CATEGORY_TABLE_NAME;
    const categoryId = event.pathParameters.categoryId;

    var params = {
        TableName: categoryTable,
        Key:{
            "categoryId": categoryId
        }
    };
    //perform delete operation
    const data = await docClient.delete(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(
      {
          message: "Successfully deleted category item",
          categoryId: categoryId
      })
    };
    // Writing logs to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
  }
  