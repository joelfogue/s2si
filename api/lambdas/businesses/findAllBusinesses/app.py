import json
from boto3.dynamodb.conditions import Key, Attr
import decimal
import logging
import os
import uuid
import boto3
from botocore.config import Config

log_level = os.environ.get('LOG_LEVEL', 'INFO')
logging.root.setLevel(logging.getLevelName(log_level))
_logger = logging.getLogger(__name__)
AWS_CONFIG = Config(retries={'max_attempts': 10})

BUSINESS_TABLE_NAME = os.environ.get('BUSINESS_TABLE_NAME')

client = boto3.client('dynamodb')
#uuid=uuid.uuid4(uuid.NAMESPACE_DNS, 'python.org')

# Helper class to convert a DynamoDB item to JSON.

# class DecimalEncoder(json.JSONEncoder):
#     def default(self, o):
#         if isinstance(o, decimal.Decimal):
#             if o % 1 > 0:
#                 return float(o)
#             else:
#                 return int(o)
#         return super(DecimalEncoder, self).default(o)


def scan_table(table_name):
    # table = dynamodb_resource.Table(table_name)

    # if filter_key and filter_value:
    #     filtering_exp = Key(filter_key).eq(filter_value)
    #     response = client.query(TableName=BUSINESS_TABLE_NAME, KeyConditionExpression=filtering_exp)
    # else:
    response = client.scan(TableName=BUSINESS_TABLE_NAME)

    return response


def lambda_handler(event, context):
    _logger.debug('Event received: {}'.format(json.dumps(event)))
    print("-------------------EVENT-----------------------")
    print(event)
    item = event['body']

    data_read = scan_table(BUSINESS_TABLE_NAME)

    response = {
        'statusCode': 200,
        'headers': { 'Content-Type': 'application/json' },
        'body': json.dumps(
            {'success': True,
             "message": data_read}
        )
    }
    
    _logger.debug('response: {}'.format(json.dumps(response)))
    return response
