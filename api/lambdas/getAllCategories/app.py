import json
import os
import uuid
import boto3
from botocore.config import Config


AWS_CONFIG = Config(retries={'max_attempts': 10})
CATEGORY_TABLE_NAME = os.environ.get('BUSINESS_TABLE_NAME')

dynamodb = boto3.resource('dynamodb', config=AWS_CONFIG)
dynamodb = dynamodb.Table(CATEGORY_TABLE_NAME)




def scan_table(table_name):

    response = client.scan(table_name)

    return response

def lambda_handler(event, context):

    print("-------------------EVENT-----------------------")
    print(event)

    data_read = scan_table(CATEGORY_TABLE_NAME)

    response = {
        'statusCode': 200,
        'headers': { 'Content-Type': 'application/json' },
        'body': json.dumps(
            {'success': True,
             "message": data_read}
        )
    }
    
    return response