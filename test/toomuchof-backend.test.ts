import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import ToomuchofBackend = require('../lib/toomuchof-backend-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ToomuchofBackend.ToomuchofBackendStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
