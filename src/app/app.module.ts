import { Providers, rootModule } from '@ditsmod/core';
import { BodyParserConfig, BodyParserModule } from '@ditsmod/body-parser';

import { HelloWorldModule } from './modules/routed/hello-world/hello-world.module.js';
import { initRest } from '@ditsmod/rest';

@initRest({
  appends: [HelloWorldModule],
  imports: [BodyParserModule],
  exports: [BodyParserModule],
  providersPerApp: new Providers()
    .useLogConfig({ level: 'info' })
    .useValue<BodyParserConfig>(BodyParserConfig, {
      jsonOptions: { limit: '100kb' },
      urlencodedOptions: { extended: true },
    }),
})
@rootModule()
export class AppModule {}
