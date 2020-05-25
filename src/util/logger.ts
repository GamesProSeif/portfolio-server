/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { join } from 'path';
import { createLogger, format, Logger, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export interface CreateLoggerOptions {
	label?: string;
	prefix?: string;
	dirname?: string;
	timestampFormat?: string;
	enableRotateFile?: boolean;
	maxFiles?: string;
	printf?: (info: any) => string;
}

const defaultPrintf = ({
	timestamp, label, level, message, topic, event, ...rest
}: any): string => {
	const r = Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : '';
	const e = event ? `[${event}]` : '';
	return `[${timestamp}][${label}][${level.toUpperCase()}][${topic}]${e}: ${message}${r}`;
};

export const generateLogger = ({
	label = 'MAIN',
	prefix = 'GamesProSeif',
	dirname = join(process.cwd(), 'logs/'),
	timestampFormat = 'YYYY/MM/DD HH:mm:ss',
	enableRotateFile = true,
	maxFiles = '14d',
	printf = defaultPrintf
}: CreateLoggerOptions = {}): Logger => {
	const trans: any = [
		new transports.Console({
			format: format.colorize({ level: true }),
			level: 'info'
		})
	];
	if (enableRotateFile) {
		trans.push(
			new DailyRotateFile({
				format: format.combine(format.timestamp(), format.json()),
				level: 'debug',
				filename: `${prefix}-%DATE%.log`,
				maxFiles,
				dirname
			})
		);
	}

	return createLogger({
		format: format.combine(
			format.errors({ stack: true }),
			format.label({ label: label.toUpperCase() }),
			format.timestamp({ format: timestampFormat }),
			format.printf(printf)
		),
		transports: trans
	});
};
