# Running This App Locally

Step 1: run `npm install`

Step 2: run `npm run sam-start`

Step 3: Perform a GET on `http://localhost:3001/helloWorld`

Local testing of this app can be performed by running `npm run sam-start`, which will start the API running in a docker container listening on port 3001. If you'd like to specify an alternative port, simply change the port number in the script.

# Deploying

To deploy, you'll need to add a `.env` file to the root of the project with two variables: `ARTIFACTS_BUCKET`, which specifies the S3 bucket to which the deploy script will upload your artifacts to, and `ENV` which specifies the environment you are deploying to. If you don't already have an S3 bucket to deploy build artifacts to, you'll have to create one.

Afterwards, run `npm run deploy`.

The deployed stack will consist of an AWS::Lambda::Function, an AWS::ApiGateway::RestApi, and a variety of permission resources and stages.

You'll need to have AWS credentials set up and the aws CLI installed to successfully run the deploy script.

# Using the Deployed API

Once deployed, you can find the URL to invoke the lambda by going to API Gateway in the AWS Console, typing in "hello-world-api-[ENV]", and clicking on "Stages" in the lefthand pane. Click on "v1" in the next pane to the right and you will see an invoke URL near the top of the screen. For more details, see [this guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-call-api.html#apigateway-how-to-call-rest-api)
