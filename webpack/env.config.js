const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
	paths: {
		/* Path to source files directory */
		buildPath: resolveApp("build"),
		/* Path to html template  */
		appHtml: resolveApp("public/index.html"),
		/* Path to favicon */
		appFavicon: resolveApp("public/favicon.ico"),
		/* Path to ts.config.json  */
		appTsConfig: resolveApp("tsconfig.json"),
		/* Path to source entry file */
		entryPath: resolveApp("./src/index.tsx"),
	},
	constants: {
		appTitle: "ALILO",
	},
	aliases: {
		"@app": resolveApp("./src/app/"),
		"@assets": resolveApp("./src/assets"),
	},
	limits: {
		/* there will be file size limits */
	},
};
