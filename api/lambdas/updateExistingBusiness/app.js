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
        //  pathParameters: { BusinessId: '1f60d728-8672-46cc-8728-bfea3542e7df' },
        const businessId = event.pathParameters.BusinessId;
        const businessName = body.BusinessName;
        const categoryName = body.Category.CategoryName;
        const businessImageIcon = body.BusinessImageIcon;
        const address = body.Address;
        const businessHours = body.BusinessHours;
        const phoneNumber = body.PhoneNumber;

        console.log('***********************Update Attributes*******************');
        console.log(body);
        console.info('BusinessID:', businessId);
        console.info('categoryName:', categoryName);
        console.log(businessName);

        var params = {
            TableName: businessTable,
            Key: {
                BusinessId: businessId
            },
            UpdateExpression: "set BusinessName = :bn, Category.CategoryName=:cn, BusinessImageIcon = :bi, Address = :addr, BusinessHours = :bh, PhoneNumber = :pn",
            ExpressionAttributeValues: {
                ":bn": businessName,
                ":cn": categoryName,
                ":bi": businessImageIcon,
                ":addr": address,
                ":bh": businessHours,
                ":pn": phoneNumber
            },
            ReturnValues: "UPDATED_NEW"
        };

        const result = await docClient.update(params).promise();

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