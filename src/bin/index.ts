#!/usr/bin/env node

import yargs from 'yargs';

import {postinstall} from './postinstall';

import {start} from '..';

export const enum Command {
	Postinstall = 'postinstall',
	Start = 'start',
}

const COMMAND_NUMBER = 1;

const main = async () => {
	const {argv} = yargs
		.demandCommand(COMMAND_NUMBER)
		.command(
			Command.Postinstall,
			'Set this command to npm `postinstall` hook',
		)
		.command(Command.Start, 'Start NodeCG')
		.strict();

	const [command] = argv._;
	switch (command) {
		case Command.Postinstall:
			await postinstall();
			break;
		case Command.Start:
			start();
			break;
		default:
			console.error('Unexpected command:', command);
			process.exitCode = 1;
			break;
	}
};

main().catch((error) => {
	console.error(error);
});
