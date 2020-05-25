// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
export const PORT = process.env.PORT || 5000;

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const PRODUCTION = process.env.NODE_ENV === 'production';

export enum EVENTS {
	READY = 'READY',
	ROUTE_LOAD = 'ROUTE_LOAD',
	ROUTE_ERROR = 'ROUTE_ERROR',
	ROUTE_HIT = 'ROUTE_HIT',
	CONNECT_DB = 'CONNECT_DB'
}

export enum TOPICS {
	ACRUS = 'ACRUS',
	EXPRESS = 'EXPRESS',
	TYPEORM = 'TYPEORM'
}
