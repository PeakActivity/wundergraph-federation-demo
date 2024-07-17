import { authProviders, configureWunderGraphApplication, cors, EnvironmentVariable, introspect, templates } from '@wundergraph/sdk';
import { NextJsTemplate } from '@wundergraph/nextjs/dist/template';
import server from './wundergraph.server';
import operations from './wundergraph.operations';

const federatedApi = introspect.federation({
	upstreams: [
		{
			url: 'http://localhost:4001/graphql',
		},
		{
			url: 'http://localhost:4003/graphql',
		},
		{
			url: 'http://localhost:4002/graphql',
		},
		{
			url: 'http://localhost:4004/graphql',
		},
	],
});

const shopify = introspect.graphql({
	apiNamespace: 'shopify',
	url: 'https://245f2c-2.myshopify.com/api/2021-07/graphql.json',
	headers: (builder) =>
	  builder.addStaticHeader('X-Shopify-Storefront-Access-Token', new EnvironmentVariable('SHOPIFY_ACCESS_TOKEN')),
})

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
	apis: [federatedApi, shopify],
	server,
	operations,
	generate: {
		codeGenerators: [
			{
				templates: [new NextJsTemplate()],
				path: '../components/generated',
			},
		],
	},
	cors: {
		...cors.allowAll,
		allowedOrigins: ['http://localhost:3000'],
	},
	authentication: {
		cookieBased: {
			providers: [
				authProviders.google({
					id: 'google',
					clientId: '451865767861-ltfq0nlabmc4jqc3ebm9rr1p2uos298b.apps.googleusercontent.com',
					clientSecret: new EnvironmentVariable('GOOGLE_CLIENT_SECRET'), // do not commit, for testing locally
				}),
			],
			authorizedRedirectUris: ['http://localhost:3000'],
		},
	},
	security: {
		enableGraphQLEndpoint: process.env.NODE_ENV !== 'production',
	},
});