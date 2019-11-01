import {
	bowerInstall,
	linkBundle,
	linkCfg,
	linkDb,
	moveNodecg,
	npmInstall,
} from '..';

export const postinstall = async () => {
	await moveNodecg();
	await Promise.all([
		npmInstall(),
		bowerInstall(),
		linkBundle(),
		linkCfg(),
		linkDb(),
	]);
};
