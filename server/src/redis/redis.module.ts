
import {
    DynamicModule, Global, Inject, Module, ModuleMetadata, Provider, Type,
} from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

export interface RedisModuleOptions {
    config: RedisOptions & { url?: string };
}

export interface RedisModuleOptionsFactory {
    createRedisModuleOptions(): Promise<RedisModuleOptions> | RedisModuleOptions;
}

export interface RedisModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useClass?: Type<RedisModuleOptionsFactory>;
    useExisting?: Type<RedisModuleOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<RedisModuleOptions> | RedisModuleOptions;
}

export const REDIS_MODULE_CONNECTION = 'default';
export const REDIS_MODULE_CONNECTION_TOKEN = 'IORedisModuleConnectionToken';
export const REDIS_MODULE_OPTIONS_TOKEN = 'IORedisModuleOptionsToken';

export function getRedisOptionsToken(connection: string): string {
    return `${connection || REDIS_MODULE_CONNECTION}_${REDIS_MODULE_OPTIONS_TOKEN}`;
}

export function getRedisConnectionToken(connection: string): string {
    return `${connection || REDIS_MODULE_CONNECTION}_${REDIS_MODULE_CONNECTION_TOKEN}`;
}

export function createRedisConnection(options: RedisModuleOptions) {
    const { config } = options;
    if (config.url) {
        return new Redis(config.url, config);
    }
    return new Redis(config);
}

export const InjectRedis = (connection?: string) => Inject(getRedisConnectionToken(connection));

@Global()
@Module({})
export class RedisModule {
    static forRoot(options: RedisModuleOptions, connection?: string): DynamicModule {
        const redisOptionsProvider: Provider = {
            provide: getRedisOptionsToken(connection),
            useValue: options,
        };

        const redisConnectionProvider: Provider = {
            provide: getRedisConnectionToken(connection),
            useValue: createRedisConnection(options),
        };

        return {
            module: RedisModule,
            providers: [
                redisOptionsProvider,
                redisConnectionProvider,
            ],
            exports: [
                redisOptionsProvider,
                redisConnectionProvider,
            ],
        };
    }

    public static forRootAsync(options: RedisModuleAsyncOptions, connection?: string): DynamicModule {
        const redisConnectionProvider: Provider = {
            provide: getRedisConnectionToken(connection),
            useFactory(opts: RedisModuleOptions) {
                return createRedisConnection(opts);
            },
            inject: [getRedisOptionsToken(connection)],
        };

        return {
            module: RedisModule,
            imports: options.imports,
            providers: [...this.createAsyncProviders(options, connection), redisConnectionProvider],
            exports: [redisConnectionProvider],
        };
    }

    public static createAsyncProviders(
        options: RedisModuleAsyncOptions,
        connection?: string,
    ): Provider[] {
        if (!(options.useExisting || options.useFactory || options.useClass)) {
            throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
        }

        if (options.useExisting || options.useFactory) {
            return [
                this.createAsyncOptionsProvider(options, connection),
            ];
        }

        return [
            this.createAsyncOptionsProvider(options, connection),
            { provide: options.useClass, useClass: options.useClass },
        ];
    }

    public static createAsyncOptionsProvider(
        options: RedisModuleAsyncOptions,
        connection?: string,
    ): Provider {
        if (!(options.useExisting || options.useFactory || options.useClass)) {
            throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
        }

        if (options.useFactory) {
            return {
                provide: getRedisOptionsToken(connection),
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }

        return {
            provide: getRedisOptionsToken(connection),
            async useFactory(optionsFactory: RedisModuleOptionsFactory): Promise<RedisModuleOptions> {
                return optionsFactory.createRedisModuleOptions();
            },
            inject: [options.useClass || options.useExisting],
        };
    }
}
