require('babel-core/register')({
    presets: ['es2015-node5', 'stage-3']
});
let app = require('./app');

const { PORT = 80 } = process.env.PORT;
const server = app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

module.exports = server;