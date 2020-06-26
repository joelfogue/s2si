#!/usr/bin/env bash

sam package \
--template-file template.yaml \
--output-template-file template-compiled.yaml \
--s3-bucket s2si \
--s3-prefix s2si \
--region us-east-1 \
--profile s2si

sam deploy \
--template-file template-compiled.yaml \
--stack-name s2si-stack \
--capabilities CAPABILITY_IAM \
--profile s2si