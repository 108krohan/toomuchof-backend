# toomuchof.me backend

An AWS CDK ([Cloud Development Kit](https://github.com/aws/aws-cdk)) powered serverless backend.

## Architecture

The backend is a simple typescript implementation for one of the very many common serverless [cdk-patterns](https://github.com/cdk-patterns/) - the simple webservice.

[architecture-diagram]: https://raw.githubusercontent.com/cdk-patterns/serverless/master/the-simple-webservice/img/architecture.png "Simple architecture diagram sourced from simple webservice cdk pattern"

![architecture diagram][architecture-diagram]

## Getting help
- **Email** 108krohan [at] gmail [dot] com.
- **Instagram** direct message @kaiserohan (I be always scrollin')
- **TODO** "What's up? / Tell me / Contact us" page on website

## Contributing
I welcome community contributions and pull requests. Here's what happens: 
1. Open issue
2. Design (optional)
3. Work your magic
4. Commit
5. Pull request
6. Merge

#### Getting Started
Commands to build and see for yourself on your local computer: 
```
$ git clone https://github.com/108krohan/toomuchof-backend
$ cd toomuchof-backend
$ npm install
$ npm run build
```

#### Common commands 
 * `npm install`     install the required dependencies
 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region. Alternatively, `npm run cdk deploy`
 * `cdk diff`        compare deployed stack with current state. Alternatively, `npm run cdk diff`
 * `cdk synth`       emits the synthesized CloudFormation template. Alternatively, `npm run cdk synth`

##### One time bootstrap
Because this stack uses assets, so the toolkit stack must be deployed to the environment. So, run `"cdk bootstrap aws://467721594212/ap-south-1`

#### Resources
- [aws cdk examples - lambda crud dynamo](https://github.com/aws-samples/aws-cdk-examples/blob/master/typescript/api-cors-lambda-crud-dynamodb/src/create.ts)
- 