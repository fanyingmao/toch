const {
    exec
} = require('child_process');
let cmd = null;
const opsys = process.platform;


module.exports.getPast = async function () {
    return new Promise((resolve, reject) => {
        if (opsys == 'darwin') {
            cmd = 'pbpaste';
        } else if (opsys == 'win32' || opsys == 'win64') {
            cmd = null;
            return;
        } else if (opsys == 'linux') {
            cmd = 'xclip -selection clipboard -o';
        }

        if (cmd) {
            exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(stdout);
            });
        }
    });
};
