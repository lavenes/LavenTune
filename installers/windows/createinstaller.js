const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {
        console.debug(error.message || error);
        process.exit(1)
    });

function getInstallerConfig () {
    console.log('creating windows installer');
    const rootPath = path.join('./');
    const outPath = path.join(rootPath, 'release-builds');

    return Promise.resolve({
        appDirectory: path.join(outPath, 'LavenTune-win32-ia32'),
        authors: 'Laven Studio',
        noMsi: true,
        outputDirectory: path.join(outPath, 'LavenTune/windows-installer'),
        exe: 'LavenTune.exe',
        setupExe: 'LavenTune-installer.exe',
        setupIcon: path.join(rootPath, 'icons', 'win', 'icon.ico')
    })
}