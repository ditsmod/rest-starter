import { Injector } from '@ditsmod/core';
import { Res } from '@ditsmod/rest';
import { jest } from '@jest/globals';

import { InjScopedController } from './inj-scoped.controller.js';
import { SomeService } from './some.service.js';

describe('InjScopedController', () => {
  const send = jest.fn();
  const sendJson = jest.fn();
  const res = { send, sendJson } as unknown as Res;
  let injScopedController: InjScopedController;

  beforeEach(() => {
    send.mockRestore();
    sendJson.mockRestore();

    const injector = Injector.resolveAndCreate([
      InjScopedController,
      { token: Res, useValue: res }
    ]);

    injScopedController = injector.get(InjScopedController);
  });

  it('should say "Hello World!"', () => {
    const someService = new SomeService();
    expect(() => injScopedController.tellHello(res, someService)).not.toThrow();
    expect(send).toHaveBeenCalledWith('Hello World!');
    expect(send).toHaveBeenCalledTimes(1);
    expect(sendJson).toHaveBeenCalledTimes(0);
  });

  it('should send post body back', () => {
    const postBody = {};
    expect(() => injScopedController.postHello(res, postBody)).not.toThrow();
    expect(sendJson).toHaveBeenCalledWith(postBody);
    expect(send).toHaveBeenCalledTimes(0);
    expect(sendJson).toHaveBeenCalledTimes(1);
  });

  it('should throw an error', () => {
    expect(() => injScopedController.thrwoError()).toThrow('Here some error occurred');
    expect(send).toHaveBeenCalledTimes(0);
    expect(sendJson).toHaveBeenCalledTimes(0);
  });
});
