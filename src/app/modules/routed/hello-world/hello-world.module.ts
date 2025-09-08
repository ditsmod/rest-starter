import { featureModule } from '@ditsmod/core';

import { InjScopedController } from './inj-scoped.controller.js';
import { CtxScopedController } from './ctx-scoped.controller.js';
import { SomeService } from './some.service.js';
import { initRest } from '@ditsmod/rest';

@initRest({
  controllers: [InjScopedController, CtxScopedController],
  providersPerMod: [SomeService], // For context-scoped controller
  providersPerReq: [SomeService], // For injector-scoped controller
})
@featureModule()
export class HelloWorldModule {}
