import * as cdk from '@aws-cdk/core';
import dynamo = require('@aws-cdk/aws-dynamodb');
import lambda = require('@aws-cdk/aws-lambda');
import apigateway = require('@aws-cdk/aws-apigateway');
import path = require('path');
import { Watchful } from 'cdk-watchful';
export class ToomuchofBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const wf = new Watchful(this, 'watchful');
    // table define
    const tableDynamo = new dynamo.Table(this, 'tableCounter', {
      tableName: "Counter",
      partitionKey: { name: 'counterId', type: dynamo.AttributeType.STRING },
      billingMode: dynamo.BillingMode.PROVISIONED,
      readCapacity: 3,
      writeCapacity: 3
    });
    // lambda define: GET_ONE, POST, UPDATE_ONE
    const lambdaGetCounter = new lambda.Function(this, 'lambdaGetCounter', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'getCounter.getOneHandler',
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda')),
      tracing: lambda.Tracing.ACTIVE
    });
    const lambdaPostCounter = new lambda.Function(this, 'lambdaPostCounter', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'postCounter.postHandler',
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda')),
      tracing: lambda.Tracing.ACTIVE
    });
    const lambdaUpdateOneCounter = new lambda.Function(this, 'lambdaUpdateOneCounter', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'updateCounter.updateOneHandler',
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda')),
      tracing: lambda.Tracing.ACTIVE
    });
    // lambda grant access to table dynamo
    tableDynamo.grantReadData(lambdaGetCounter);
    tableDynamo.grantWriteData(lambdaPostCounter);
    tableDynamo.grantReadWriteData(lambdaUpdateOneCounter);
    // apiGateway define
    const apiGatewayCounterApi = new apigateway.RestApi(this, 'counter-api', {
      restApiName: 'Counter Service'
    });
    // apiGateway define integration lambda: GET, POST
    const integrationPostCounter = new apigateway.LambdaIntegration(lambdaPostCounter);
    const integrationGetCounter = new apigateway.LambdaIntegration(lambdaGetCounter);
    const integrationUpdateCounter = new apigateway.LambdaIntegration(lambdaUpdateOneCounter);
    // add root resource path, and lambdas
    const counters = apiGatewayCounterApi.root.addResource('counter');
    counters.addMethod('POST', integrationPostCounter);
    // add single item level resource path, and lambdas
    const counter = counters.addResource('{counterId}');
    counter.addMethod('GET', integrationGetCounter);
    counter.addMethod('PATCH', integrationUpdateCounter);
    // enable cross origin resource sharing
    addCorsOptions(counters);
    addCorsOptions(counter);
    // cloudwatch monitors for dynamo
    // https://github.com/eladb/cdk-watchful
    wf.watchLambdaFunction('Function GetCounter', lambdaGetCounter);
    wf.watchLambdaFunction('Function PostCounter', lambdaPostCounter);
    wf.watchApiGateway('API CounterAPI', apiGatewayCounterApi);
    // to watch dynamo, it requires read capacity units, which require provisioning...
    wf.watchDynamoTable('Table Counter', tableDynamo);
  }
}

export function addCorsOptions(apiResource: apigateway.IResource) {
  apiResource.addMethod('OPTIONS', new apigateway.MockIntegration({
    integrationResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
        'method.response.header.Access-Control-Allow-Origin': "'*'",
        'method.response.header.Access-Control-Allow-Credentials': "'false'",
        'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
      },
    }],
    passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
    requestTemplates: {
      "application/json": "{\"statusCode\": 200}"
    },
  }), {
    methodResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Methods': true,
        'method.response.header.Access-Control-Allow-Credentials': true,
        'method.response.header.Access-Control-Allow-Origin': true,
      },
    }]
  })
}
