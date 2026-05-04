import { restModule } from '@ditsmod/rest';

import { InjScopedController } from './inj-scoped.controller.js';
import { CtxScopedController } from './ctx-scoped.controller.js';
import { SomeService } from './some.service.js';

@restModule({
  controllers: [InjScopedController, CtxScopedController],
  providersPerMod: [SomeService], // For context-scoped controller
  providersPerReq: [SomeService], // For injector-scoped controller
})
export class HelloWorldModule {}
