module.exports = function (grunt) {
	grunt.initConfig({
		watch: {
			autoTest: {
				files: [ "index.js", "test/**.js" ],
				tasks: [ "buster:local:test" ]
			}
		},
		buster: {
			local: {
			}
		},
		open: {
			"capture-browser": {
				path: "http://127.0.0.1:1111/capture"
			}
		},
		"saucelabs-custom": {
			dist: {
				options: {
					testname: "get-visible-rect via buster-static",
					build: process.env.TRAVIS_JOB_ID || "",
					browsers: [
						{ browserName: 'internet explorer', platform: "Windows 8.1", version: '11' },
						{ browserName: 'internet explorer', platform: "Windows 7", version: '11' },
						{ browserName: 'internet explorer', platform: "Windows 7", version: '10' },
						{ browserName: 'firefox', platform: "Windows 8.1" },
						{ browserName: 'firefox', platform: "Windows 7" },
						{ browserName: 'firefox', platform: "OS X 10.9" },
						{ browserName: 'firefox', platform: "Linux" },
						{ browserName: 'chrome', platform: "Windows 8.1" },
						{ browserName: 'chrome', platform: "Windows 7" },
						{ browserName: 'chrome', platform: "OS X 10.9" },
						{ browserName: 'chrome', platform: "Linux" },
						{ browserName: 'safari', platform: "OS X 10.9" }
					],
					urls: [
						"http://127.0.0.1:8000/?reporter=sauce"
					]
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-buster");
	grunt.loadNpmTasks("grunt-open");
	grunt.loadNpmTasks("grunt-saucelabs");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-release");

	grunt.registerTask("default", [ "test" ]);
	grunt.registerTask("test", [ process.env.SAUCE_USERNAME ? "test-sauce" : "test-local" ]);
	grunt.registerTask("test-sauce", [ "buster-static", "saucelabs-custom" ]);
	grunt.registerTask("test-local", [ "buster:local:server", "open:capture-browser", "buster:local:test" ]);
	grunt.registerTask("start-dev", [ "buster:local:server", "open:capture-browser", "watch" ]);

	grunt.registerTask("buster-static", function () {
		// @todo: move buster-static task to grunt-buster package
		var done = this.async();

		var resolveBin = require("resolve-bin"),
			cp = require('child_process');

		resolveBin("buster", { executable: "buster-static" }, function (e, busterStaticBinPath) {
			if (e) {
				grunt.fail.fatal(e);
				return;
			}
			grunt.log.writeln("Spawning " + busterStaticBinPath + " --port 8000");
			var busterStaticProcess = cp.spawn(process.execPath, [ busterStaticBinPath, "--port", "8000" ], {
				env: process.env,
				setsid: true
			});
			busterStaticProcess.stdout.once('data', function () {
				done();
			});
			busterStaticProcess.stderr.on('data', function (data) {
				grunt.fail.fatal(data);
			});
			process.on("exit", function () {
				busterStaticProcess.kill();
			})
		})
	});

};
