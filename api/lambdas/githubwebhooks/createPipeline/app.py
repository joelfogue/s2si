import logging
log_level = os.environ.get('LOG_LEVEL', 'INFO')
logging.root.setLevel(logging.getLevelName(log_level))
_logger = logging.getLogger(__name__)
AWS_CONFIG = Config(retries={'max_attempts': 10})


def lambda_handler(event, context):
    _logger.debug('Event received: {}'.format(json.dumps(event)))

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
