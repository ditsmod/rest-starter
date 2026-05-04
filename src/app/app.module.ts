import { Providers } from '@ditsmod/core';
import { restRootModule } from '@ditsmod/rest';
import { BodyParserConfig, BodyParserModule } from '@ditsmod/body-parser';

import { HelloWorldModule } from './modules/routed/hello-world/hello-world.module.js';

@restRootModule({
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
export class AppModule {}
