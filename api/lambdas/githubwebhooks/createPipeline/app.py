import logging
import os
import json

log_level = os.environ.get('LOG_LEVEL', 'INFO')
logging.root.setLevel(logging.getLevelName(log_level))
_logger = logging.getLogger(__name__)


def lambda_handler(event, context):
    _logger.info('Event received: {}'+json.dumps(event))
    response = {
            'statusCode': 200,
            'headers': { 'Content-Type': 'application/json' },
            'body': json.dumps(
                {'success': True,
                "message": event}
            )
        }
        
    _logger.debug('response: {}'.format(json.dumps(response)))
    return response
    # Region=event['region']
    # Account = event['account']
    # RepositoryName = event['detail']['repositoryName']
    # NewBranch = event['detail']['referenceName']
    # Event = event['detail']['event']
    # if NewBranch == "master":
    #     quit()
    # if Event == "referenceCreated":
    # cf_client = boto3.client('cloudformation')
    # cf_client.create_stack(
    #     StackName= f'Pipeline-{RepositoryName}-{NewBranch}',
    #     TemplateURL= f'https://s3.amazonaws.com/{Account}-templates/TemplatePipeline.yaml',
    #     Parameters=[
    #         {
    #             'ParameterKey': 'RepositoryName',
    #             'ParameterValue': RepositoryName,
    #             'UsePreviousValue': False
    #         },
    #         {
    #             'ParameterKey': 'BranchName',
    #             'ParameterValue': NewBranch,
    #             'UsePreviousValue': False
    #         }
    #     ],
    #     OnFailure='ROLLBACK',
    #     Capabilities=['CAPABILITY_NAMED_IAM']
    # )
    # else:
    # cf_client = boto3.client('cloudformation')
    # cf_client.delete_stack(
    #     StackName= f'Pipeline-{RepositoryName}-{NewBranch}'
    #     )
