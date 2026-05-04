export abstract class BaseModule {
    abstract readonly tag: string;

    abstract init(): void;

    public initHooks(): void {} // hooks here
}
