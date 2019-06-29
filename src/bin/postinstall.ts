import {bowerInstall, linkBundle, linkCfg, linkDb} from '..';

export const postinstall = (): void => {
	bowerInstall().catch((error) => {
		console.error('Failed to run bower install', error.stack);
		process.exitCode = 1;
	});
	linkBundle().catch((error) => {
		console.error('Failed to link bundle directory', error.stack);
		process.exitCode = 1;
	});
	linkCfg().catch((error) => {
		console.error('Failed to link cfg directory', error.stack);
		process.exitCode = 1;
	});
	linkDb().catch((error) => {
		console.error('Failed to link db directory', error.stack);
		process.exitCode = 1;
	});
};
