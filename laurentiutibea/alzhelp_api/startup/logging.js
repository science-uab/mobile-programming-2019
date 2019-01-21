require("express-async-errors");

module.exports = function () {
    process.on("uncaughtException", (ex) => {
        console.log(ex.message, ex);
        process.exit(1);
    });

    process.on("unhandledRejection", (ex) => {
	    console.log(ex.message, ex);
        process.exit(1);
    });
};