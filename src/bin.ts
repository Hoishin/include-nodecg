#!/usr/bin/env node

import yargs from 'yargs';
import {postinstall} from './postinstall';
import {start} from './start';

export const enum Command {
	Postinstall = 'postinstall',
	Start = 'start',
}

const {argv} = yargs
	.demandCommand(1)
	.command(Command.Postinstall, 'Set this command to npm `postinstall` hook')
	.command(Command.Start, 'Start NodeCG')
	.strict();

const [command] = argv._;

switch (command) {
	case Command.Postinstall:
		postinstall();
		break;
	case Command.Start:
		start();
		break;
	default:
		console.error('Unexpected command:', command);
		process.exitCode = 1;
		break;
}
