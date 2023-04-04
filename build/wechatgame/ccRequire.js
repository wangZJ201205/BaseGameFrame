let moduleMap = {
'src/assets/script/socket/socket.io.js' () { return require('src/assets/script/socket/socket.io.js') },
'assets/internal/index.js' () { return require('assets/internal/index.js') },
'src/scripts/resources/index.js' () { return require('src/scripts/resources/index.js') },
'src/scripts/script/index.js' () { return require('src/scripts/script/index.js') },
'src/scripts/startscene/index.js' () { return require('src/scripts/startscene/index.js') },
'assets/main/index.js' () { return require('assets/main/index.js') },
// tail
};

window.__cocos_require__ = function (moduleName) {
    let func = moduleMap[moduleName];
    if (!func) {
        throw new Error(`cannot find module ${moduleName}`);
    }
    return func();
};