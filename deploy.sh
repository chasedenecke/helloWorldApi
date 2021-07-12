set -o allexport; source .env; set +o allexport
aws cloudformation package --template-file template.yml --s3-bucket $ARTIFACTS_BUCKET --output-template-file cloudformationTemplate.yml
aws cloudformation deploy --template cloudformationTemplate.yml --capabilities CAPABILITY_NAMED_IAM --stack-name hello-world-api-$ENV --s3-bucket $ARTIFACTS_BUCKET --parameter-overrides ENV=dev
