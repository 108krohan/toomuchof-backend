#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ToomuchofBackendStack } from '../lib/toomuchof-backend-stack';

const app = new cdk.App();
new ToomuchofBackendStack(app, 'ToomuchofBackendStack');
