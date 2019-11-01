import path from 'path';
import fs from 'fs';
import {promisify} from 'util';

import execa from 'execa';
import del from 'del';
import appRootPath from 'app-root-path';
import isRoot from 'is-root';
import isDocker from 'is-docker';
import cpx from 'cpx';

const symlink = promisify(fs.symlink);
const readdir = promisify(fs.readdir);

const nodecgPath = appRootPath.resolve('.nodecg');
const {name: bundleName} = appRootPath.require('package.json');

export const moveNodecg = async (): Promise<void> => {
	await del([
		`${nodecgPath}/**`,
		`!${nodecgPath}`,
		`!${nodecgPath}/cfg`,
		`!${nodecgPath}/db`,
	]);
	return new Promise((resolve, reject) => {
		cpx.copy(
			appRootPath.resolve('node_modules/nodecg/**/*'),
			nodecgPath,
			{includeEmptyDirs: true},
			(error) => {
				if (error === null) {
					resolve();
				} else {
					reject(error);
				}
			},
		);
	});
};

export const npmInstall = async () => {
	await execa.command('npm ci --production', {cwd: nodecgPath});
};

export const bowerInstall = async (): Promise<void> => {
	const nodecgDirFiles = await readdir(nodecgPath, {encoding: 'utf8'});
	if (!nodecgDirFiles.includes('bower.json')) {
		return;
	}
	const shouldAllowRoot = isDocker() && isRoot();
	const bowerProcess = execa.command(
		shouldAllowRoot
			? 'bower install --production --allow-root'
			: 'bower install --production',
		{preferLocal: true, cwd: nodecgPath},
	);
	bowerProcess.stderr.pipe(process.stderr);
	await bowerProcess;
};

export const linkBundle = async (): Promise<void> => {
	const bundlePath = path.join(nodecgPath, 'bundles', bundleName);
	await del(bundlePath);
	await symlink(
		path.relative(path.dirname(bundlePath), appRootPath.path),
		bundlePath,
		'dir',
	);
};

export const start = (): void => {
	require(nodecgPath); // eslint-disable-line @typescript-eslint/no-require-imports
};
