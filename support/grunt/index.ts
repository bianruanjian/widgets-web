import * as config from './config';
import { basename, extname, join } from 'path';
import { initConfig } from 'grunt-dojo2';
import { readdirSync } from 'fs';

export = function(grunt: IGrunt) {
	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('webserv');
	grunt.loadNpmTasks('grunt-dojo2-extras');

	const tasksDirectory = join(__dirname, 'tasks');
	readdirSync(tasksDirectory)
		.filter(function(path) {
			return extname(path) === '.ts';
		})
		.forEach(function(file) {
			const mid = join(tasksDirectory, basename(file, '.ts'));
			require(mid)(grunt);
		});

	initConfig(grunt, config);

	grunt.registerTask('default', ['hexoClean', 'clean', 'sync', 'hexo']);
	grunt.registerTask('generate', ['hexo']);
	// grunt.registerTask('test', [ 'clean:compiledFiles', 'tslint', 'shell:build-ts', 'intern' ]);
	grunt.registerTask('init', ['prompt:github', 'initAutomation']);
	grunt.registerTask('ci', ['prebuild', 'default']);
	grunt.registerTask(
		'dist',
		(grunt.config.get('distTasks') as string[]).concat([
			'postcss:modules-dist',
			'postcss:variables',
			'copy:distFonts'
		])
	);
};
