#!/usr/bin/env bash

sam package \
--template-file template.yaml \
--output-template-file template-compiled.yaml \
--s3-bucket joelturkeys2si \
--s3-prefix s2si \
--region us-east-1 \
--profile saml

sam deploy \
--template-file template-compiled.yaml \
--stack-name jjoelturkeys \
--capabilities CAPABILITY_IAM \
--profile saml