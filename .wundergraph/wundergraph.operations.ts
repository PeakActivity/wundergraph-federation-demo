import { configureWunderGraphOperations } from '@wundergraph/sdk';
import type { OperationsConfiguration } from './generated/wundergraph.operations';

export default configureWunderGraphOperations<OperationsConfiguration>({
	operations: {
		defaultConfig: {
			authentication: {
				required: true, // Set to true to require authentication for all operations
			},
		},
		queries: (config) => ({
			...config,
			caching: {
				enable: false,
				staleWhileRevalidate: 60,
				maxAge: 60,
				public: true,
			},
			liveQuery: {
				enable: true,
				pollingIntervalSeconds: 1,
			},
		}),
		mutations: (config) => ({
			...config,
		}),
		subscriptions: (config) => ({
			...config,
		}),
		custom: {},
	},
});
