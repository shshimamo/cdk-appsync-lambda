#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkAppsyncLambdaStack } from '../lib/cdk-appsync-lambda-stack';

const app = new cdk.App();
new CdkAppsyncLambdaStack(app, 'CdkAppsyncLambdaStack', {
});
