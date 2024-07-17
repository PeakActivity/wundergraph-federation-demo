import type {
	ClientConfig,
	CreateClientConfig,
	User,
	UploadRequestOptions,
	OperationMetadata,
	OperationsDefinition,
	OperationRequestOptions,
	SubscriptionRequestOptions,
	SubscriptionEventHandler,
	FetchUserRequestOptions,
	UploadValidationOptions,
	QueryRequestOptions,
	MutationRequestOptions,
	ClientOperationErrors,
	ExtractProfileName,
	ExtractMeta,
	GraphQLError,
} from "@wundergraph/sdk/client";
import { Client } from "@wundergraph/sdk/client";
import type { OperationErrors } from "./ts-operation-errors";

import type { PublicCustomClaims } from "./claims";
import type {
	PriceUpdatesResponse,
	PriceUpdatesResponseData,
	TopProductsResponse,
	TopProductsResponseData,
	ProductGetResponse,
	ProductGetInput,
	ProductGetResponseData,
	ProductSubscribeResponse,
	ProductSubscribeInput,
	ProductSubscribeResponseData,
	ProductUpdateResponse,
	ProductUpdateInput,
	ProductUpdateResponseData,
} from "./models";
export type UserRole = "admin" | "user";

export const WUNDERGRAPH_S3_ENABLED = false;
export const WUNDERGRAPH_AUTH_ENABLED = true;

export enum AuthProviderId {
	"google" = "google",
}

export interface AuthProvider {
	id: AuthProviderId;
	login: (redirectURI?: string) => void;
}

export const defaultClientConfig: ClientConfig = {
	applicationHash: "ba657e44",
	baseURL: "http://localhost:9991",
	sdkVersion: "0.184.2",
};

export const operationMetadata: OperationMetadata = {
	PriceUpdates: {
		requiresAuthentication: true,
	},
	TopProducts: {
		requiresAuthentication: true,
	},
	"product/get": {
		requiresAuthentication: true,
	},
	"product/subscribe": {
		requiresAuthentication: true,
	},
	"product/update": {
		requiresAuthentication: true,
	},
};

export type PublicUser = User<UserRole, PublicCustomClaims>;

export class WunderGraphClient extends Client {
	query<
		OperationName extends Extract<keyof Operations["queries"], string>,
		Input extends Operations["queries"][OperationName]["input"] = Operations["queries"][OperationName]["input"],
		Response extends Operations["queries"][OperationName]["response"] = Operations["queries"][OperationName]["response"]
	>(options: OperationName extends string ? QueryRequestOptions<OperationName, Input> : OperationRequestOptions) {
		return super.query<OperationRequestOptions, Response["data"], Response["error"]>(options);
	}

	mutate<
		OperationName extends Extract<keyof Operations["mutations"], string>,
		Input extends Operations["mutations"][OperationName]["input"] = Operations["mutations"][OperationName]["input"],
		Response extends Operations["mutations"][OperationName]["response"] = Operations["mutations"][OperationName]["response"]
	>(options: OperationName extends string ? MutationRequestOptions<OperationName, Input> : OperationRequestOptions) {
		return super.mutate<OperationRequestOptions, Response["data"], Response["error"]>(options);
	}

	subscribe<
		OperationName extends Extract<keyof Operations["subscriptions"], string>,
		Input extends Operations["subscriptions"][OperationName]["input"] = Operations["subscriptions"][OperationName]["input"],
		Response extends Operations["subscriptions"][OperationName]["response"] = Operations["subscriptions"][OperationName]["response"]
	>(
		options: OperationName extends string
			? SubscriptionRequestOptions<OperationName, Input>
			: SubscriptionRequestOptions,
		cb?: SubscriptionEventHandler<Response["data"], Response["error"]>
	) {
		return super.subscribe<OperationRequestOptions, Response["data"], Response["error"]>(options, cb);
	}
	public login(authProviderID: Operations["authProvider"], redirectURI?: string) {
		return super.login(authProviderID, redirectURI);
	}
	public async fetchUser<TUser extends PublicUser = PublicUser>(options?: FetchUserRequestOptions) {
		return super.fetchUser<TUser>(options);
	}
	public withHeaders = (headers: { [key: string]: string }) => {
		return new WunderGraphClient({
			...this.options,
			extraHeaders: headers,
		});
	};
}

export const createClient = (config?: CreateClientConfig) => {
	return new WunderGraphClient({
		...defaultClientConfig,
		...config,
		operationMetadata,
		csrfEnabled: true,
	});
};

export type Queries = {
	TopProducts: {
		input?: undefined;
		response: { data?: TopProductsResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: true;
		liveQuery: boolean;
	};
	"product/get": {
		input: ProductGetInput;
		response: { data?: ProductGetResponseData; error?: OperationErrors["product/get"] };
		requiresAuthentication: true;
		liveQuery: boolean;
	};
};

export type Mutations = {
	"product/update": {
		input: ProductUpdateInput;
		response: { data?: ProductUpdateResponseData; error?: OperationErrors["product/update"] };
		requiresAuthentication: true;
	};
};

export type Subscriptions = {
	PriceUpdates: {
		input?: undefined;
		response: { data?: PriceUpdatesResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: true;
	};
	"product/subscribe": {
		input: ProductSubscribeInput;
		response: { data?: ProductSubscribeResponseData; error?: OperationErrors["product/subscribe"] };
		requiresAuthentication: true;
	};
	TopProducts: {
		input?: undefined;
		response: { data?: TopProductsResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: true;
	};
	"product/get": {
		input: ProductGetInput;
		response: { data?: ProductGetResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: true;
	};
};

export type LiveQueries = {
	TopProducts: {
		input?: undefined;
		response: { data?: TopProductsResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: true;
	};
	"product/get": {
		input: ProductGetInput;
		response: { data?: ProductGetResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: true;
	};
};

export interface Operations
	extends OperationsDefinition<
		Queries,
		Mutations,
		Subscriptions,
		LiveQueries,
		UserRole,
		{},
		keyof typeof AuthProviderId
	> {}
