const { exec } = require('child_process');
let cmd = null;
const opsys = process.platform;

module.exports.getPast = async()=>{
    return new Promise((resolve,reject)=>{
        if(opsys == 'darwin'){ 
            cmd = 'pbpast';
        }else if (opsys == 'win32' || opsys == 'win64') {
            cmd = null;
            reject('no found command');
            return;
        } else if (opsys == 'linux') {
            cmd = 'xclip -selection clipboard -o';
        }
        
        if(cmd){
            exec(cmd, (err, stdout, stderr) => {
                if(err) {
                    reject(console.error(err));
                    return;
                }
                resolve(stdout);
            });
        }
    });
}
