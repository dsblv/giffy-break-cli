#!/usr/bin/env node
'use strict';
const meow = require('meow');
const giffyBreak = require('giffy-break');
const spawn = require('cross-spawn-async');
const opn = require('opn');

meow(`
	Usage
		$ giffy-break <input>

	Example
		$ giffy-break npm install
`);

const command = process.argv[2];
const args = process.argv.slice(3);

const input = new Promise((resolve, reject) => {
	spawn(command, args, {stdio: 'inherit'})
		.on('exit', code => {
			if (code === 0) {
				resolve();
			} else {
				reject(code);
			}
		});
});

giffyBreak(input, 'dc6zaTOxFJmzC', {
	startMessage: `Running <code>$ ${command} ${args.join(' ')}</code>`
}).then(opn);
