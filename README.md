# toomuchof.me backend

An AWS CDK ([Cloud Development Kit](https://github.com/aws/aws-cdk)) powered serverless backend.

## architecture

The backend is a simple typescript implementation for one of the very many common serverless [cdk-patterns](https://github.com/cdk-patterns/) - the simple webservice.

[architecture-diagram]: https://raw.githubusercontent.com/cdk-patterns/serverless/master/the-simple-webservice/img/architecture.png "simple architecture diagram sourced from simple webservice cdk pattern"

![architecture diagram][architecture-diagram]

## getting help
- **email** 108krohan [at] gmail [dot] com.
- **instagram** direct message @kaiserohan (i be always scrollin')
- **todo** "What's up? / Tell me / Contact us" page on website

## contributing
I welcome community contributions and pull requests. Here's what happens: 
1. Open issue
2. Design (optional)
3. Work your magic
4. Commit
5. Pull request
6. Merge

#### getting started

Commands to build and see for yourself on your local computer: 
```
$ git clone https://github.com/108krohan/toomuchof-backend
$ cd toomuchof-backend
$ npm install
$ npm run build
```

A typical end to end workflow of terminal commands would be: 
1. `npm run build` to build the project
1. `cdk synth` to synthesis the cloudformation stack
1. `cdk deploy` to deploy to the aws account.

If you've got credentials from me to deploy changes to the website, you're completely free to do so yourself, just be sure to check in the code here :)

#### common commands 
 * `npm install`     install the required dependencies
 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region. Alternatively, `npm run cdk deploy`
 * `cdk diff`        compare deployed stack with current state. Alternatively, `npm run cdk diff`
 * `cdk synth`       emits the synthesized CloudFormation template. Alternatively, `npm run cdk synth`

##### one time bootstrap
Because this stack uses assets, so the toolkit stack must be deployed to the environment. So, run `"cdk bootstrap aws://467721594212/ap-south-1`

#### resources
- [aws cdk examples - lambda crud dynamo](https://github.com/aws-samples/aws-cdk-examples/blob/master/typescript/api-cors-lambda-crud-dynamodb/src/create.ts)
- [cKD workshop](https://cdkworkshop.com/20-typescript)