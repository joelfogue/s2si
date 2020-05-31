
let response;


var AWS = require("aws-sdk");

// AWS.config.update({
//   region: "us-east-",
//   endpoint: "http://localhost:8000"
// });

var docClient = new AWS.DynamoDB.DocumentClient();



//  response = {
//     'statusCode': 200,
//     'body': JSON.stringify({
//         message: 'This lambda will deleteBusiness',
//         // location: ret.data.trim()
//     })
// }
exports.lambdaHandler = async (event, context) => {

    const businessTable = process.env.BUSINESS_TABLE_NAME;
    const id = event.queryStringParameters.BusinessId;

    console.log('-------------id/businessTable------------------------------');
    console.log(id);
    console.log(businessTable);

    var params = {
        TableName:businessTable,
        Key:{
            "id": id
        }
    };

    console.log('--------------Params-------------')
    console.log(params);

    console.log("-----------Event------------------");
    console.log(event)
    console.log("-----------------------------");
    try {
        console.log("Attempting to delete an item...");
        docClient.delete(params, function(err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Successfully deleted item:", JSON.stringify(data, null, 2));
            }
        });
    } catch (err) {
        console.log(err);
        return err;
    }
    return response
};

                   