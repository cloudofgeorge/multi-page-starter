/*
 * Initialize the core services of application
 * Make sure to import the bootstrap file in the main.ts file
 */

export class Bootstrap {
  initService(): void {
    console.log('initService');
  }

  initAsyncService(): Promise<string> {
    return Promise.resolve('initAsyncService');
  }
}

export const initBootstrap = async (bootstrap: Bootstrap): Promise<Bootstrap> => {
  bootstrap.initService();
  await bootstrap.initAsyncService();

  return bootstrap;
};
