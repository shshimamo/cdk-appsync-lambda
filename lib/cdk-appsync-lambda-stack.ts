import * as cdk from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as go from '@aws-cdk/aws-lambda-go-alpha'
import { Construct } from 'constructs';
import * as path from "path";

export class CdkAppsyncLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // GraphQL API
    const graphQlApi = new appsync.GraphqlApi(this, 'my-appsync-api', {
      name: 'my-appsync-api',
      schema: appsync.SchemaFile.fromAsset(path.join(__dirname, 'schema.graphql')),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
    })

    // Lambda関数
    const userFindFn = new go.GoFunction(this, "userFindFunction", {
      entry: 'lambda',
      timeout: cdk.Duration.seconds(300)
    })

    // Lambda関数をDataSourceとしてAppSyncAPIと紐付ける
    const userFindDS = graphQlApi.addLambdaDataSource('userFindDataSource', userFindFn)

    // schema.graphql で定義した操作とマッピング
    userFindDS.createResolver("userFindResolver", {
      typeName: 'Query',
      fieldName: 'userFind',
    })
  }
}
