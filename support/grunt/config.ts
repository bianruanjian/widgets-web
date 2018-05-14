import { Config } from 'webserv/commands/createServer';
import { middleware } from './config/webserv';
import { repositorySource } from 'grunt-dojo2-extras/src/util/environment';
import { join } from 'path';
const pkgDir = require('pkg-dir');

export interface WebServerConfig {
	[key: string]: Config;
}

// ---------------------------------------------------------------------------------------------------------------------
// Variables
// ---------------------------------------------------------------------------------------------------------------------
export const [repoOwner, repoName] = repositorySource().split('/');

export const dojoProjectOwner = 'dojo';

export const ghPagesBranch = 'gh-pages';

export const binDirectory = join('node_modules', '.bin');

export const _distDirectory = '_dist';

export const siteDirectory = 'site';

export const syncDirectory = '.sync';

export const publishDirectory = '.ghpublish';

// This is considered the master branch as far as the CI is concerned
export const masterBranch = 'master';

const createProcessors = require('grunt-dojo2/tasks/util/postcss').createProcessors;

const packagePath = pkgDir.sync(process.cwd());

const fontFiles = 'theme/fonts/*.{svg,ttf,woff}';
const staticExampleFiles = ['*/example/**', '!*/example/**/*.js'];
const staticTestFiles = '*/tests/**/*.{html,css,json,xml,js,txt}';

// ---------------------------------------------------------------------------------------------------------------------
// Task Configuration
// ---------------------------------------------------------------------------------------------------------------------

export const copy = {
	'staticDefinitionFiles-dev': {
		cwd: 'src',
		src: ['<%= staticDefinitionFiles %>'],
		dest: '<%= devDirectory %>'
	},
	staticTestFiles: {
		expand: true,
		cwd: 'src',
		src: [staticTestFiles],
		dest: '<%= devDirectory %>'
	},
	staticExampleFiles: {
		expand: true,
		cwd: 'src',
		src: staticExampleFiles,
		dest: '<%= devDirectory %>'
	},
	devFonts: {
		expand: true,
		cwd: 'src',
		src: fontFiles,
		dest: '<%= devDirectory %>'
	},
	distFonts: {
		expand: true,
		cwd: 'src',
		src: fontFiles,
		dest: '<%= distDirectory %>'
	},
	devStyles: {
		expand: true,
		cwd: 'src',
		src: '**/example.css',
		dest: '<%= devDirectory %>'
	}
};

export const postcss = {
	'modules-dev': {
		files: [
			{
				expand: true,
				src: ['**/*.m.css'],
				dest: '<%= devDirectory %>',
				cwd: 'src'
			}
		],
		options: {
			processors: createProcessors({
				dest: '_build/',
				cwd: 'src',
				packageJson: require(join(packagePath, 'package.json'))
			})
		}
	}
};

export const clean = {
	dist: ['<%= _distDirectory %>'],
	publish: ['<%= publishDirectory %>'],
	sync: ['<%= syncDirectory %>'],
	compiledFiles: ['./+(tests|support)/**/*.d.ts', './+(tests|support)/**/*.js']
};

export const hexo = {
	generate: {
		src: '<%= siteDirectory %>',
		dest: '<%= _distDirectory %>'
	}
};

export const intern = {
	version: 4
};

export const prompt = {
	github: {
		options: {
			questions: [
				{
					config: 'github.username',
					type: 'input',
					message: 'Github username'
				},
				{
					config: 'github.password',
					type: 'password',
					message: 'Github password'
				}
			]
		}
	}
};

export const publish = {
	'gh-pages': {
		options: {
			branch: 'gh-pages',
			cloneDirectory: '<%= _distDirectory %>'
		}
	}
};

export const initAutomation = {
	repo: {
		options: {
			repoOwner: '<%= repoOwner %>',
			repoName: '<%= repoName %>'
		}
	}
};

export const shell = {
	'build-tests': {
		command: 'tsc',
		options: {
			execOptions: {
				cwd: 'tests'
			}
		}
	},
	'build-ts': {
		command: 'tsc',
		options: {
			execOptions: {
				cwd: 'support'
			}
		}
	}
};

export const sync = {
	'gh-pages': {
		options: {
			branch: 'gh-pages',
			cloneDirectory: '<%= _distDirectory %>'
		}
	}
};

export const tslint = {
	options: {
		configuration: 'tslint.json'
	},
	support: 'support/**/*.ts',
	site: ['site/**/*.ts', '!site/node_modules/**']
};

/**
 * Host a local development server
 */
export const webserv: WebServerConfig = {
	server: {
		middleware
	}
};

export const typedoc = {
	options: {
		ignoreCompilerErrors: true // Remove this once compile errors are resolved
	}
};
