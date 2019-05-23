import yargs from 'yargs';
import {postinstall} from './postinstall';

export const enum Command {
	Postinstall = 'postinstall',
	Start = 'start',
}

const {argv} = yargs
	.demandCommand(1)
	.command(Command.Postinstall, 'Set this command to npm `postinstall` hook')
	.strict();

const [command] = argv._;

switch (command) {
	case Command.Postinstall:
		postinstall();
		break;
	default:
		console.error('Unexpected command:', command);
		break;
}
