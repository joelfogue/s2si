
let response;


var AWS = require("aws-sdk");

// AWS.config.update({
//   region: "us-east-",
//   endpoint: "http://localhost:8000"
// });

var docClient = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event, context) => {
    console.log('----------------DeleteBusiness Event---------------------');
    console.log(event);
    const businessTable = process.env.BUSINESS_TABLE_NAME;
    const businessId = event.pathParameters.BusinessId;
    var params = {
        TableName:businessTable,
        Key:{
            "id": businessId
        }
    };
    console.log('--------------Params-------------')
    console.log(params);
    try {
        console.log("Attempting to delete an item...");
        docClient.delete(params, function(err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Successfully deleted item:", JSON.stringify(data, null, 2));
                //  response = {
                // 'statusCode': 200,
                // 'body': JSON.stringify({
                //     message: data,
                // })
                //}
            }
        });
    } catch (err) {
        console.log(err);
        return err;
    }
    return response
};

{
    "isBase64Encoded": true|false,
    "statusCode": httpStatusCode,
    "headers": { "headerName": "headerValue", ... },
    "body": "..."
}                  