import {bowerInstall, linkBundle, moveNodecg, npmInstall} from '..';

export const postinstall = async () => {
	await moveNodecg();
	await Promise.all([npmInstall(), bowerInstall(), linkBundle()]);
};
