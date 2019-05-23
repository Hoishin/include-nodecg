import {execFileSync} from 'child_process';
import path from 'path';
import fs from 'fs';
import del from 'del';
import appRootPath from 'app-root-path';
import isRoot from 'is-root';
import isDocker from 'is-docker';

export const postinstall = (): void => {
	const {name: bundleName} = appRootPath.require('package.json');
	const nodecgPath = path.dirname(require.resolve('nodecg'));
	const bundlePath = path.join(nodecgPath, 'bundles', bundleName);

	del.sync(bundlePath);
	fs.symlinkSync(
		path.relative(bundlePath, appRootPath.path),
		bundlePath,
		'dir',
	);
	process.chdir(nodecgPath);
	const bowerOptions = ['install', '--production'];
	if (isDocker() && isRoot()) {
		bowerOptions.push('--allow-root');
	}
	execFileSync(appRootPath.resolve('node_modules/.bin/bower'), bowerOptions);
};
