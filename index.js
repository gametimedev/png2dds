const { execFile } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

async function pngBuffer2DDSBuffer(buffer){
    const tempDir = os.tmpdir();
    const inpurFileName = `input_${Date.now()}.png`;
    const inputPath = path.join(tempDir, inpurFileName);
    fs.writeFileSync(inputPath,buffer);
    let ddsbuffer = await pngFile2DDSBuffer(inputPath);
    fs.access(inputPath, fs.constants.F_OK, (err) => {
        if (err) {return;}
        fs.unlink(inputPath, (err) => {if (err) {return ;}});
    });
    return ddsbuffer;
}

function pngFile2DDSBuffer(imagePath) {
    const fixedValue = 'BC3RgbaUnorm';
    let executablePath;

    if (os.platform() === 'win32') {
        executablePath = path.join(__dirname, 'data' ,'img2dds.exe');
    } else if (os.platform() === 'darwin') {
        executablePath = path.join(__dirname, 'data' ,'img2dds');
    } else {
        throw new Error('Unsupported OS');
    }
    const tempDir = os.tmpdir();
    const outputFileName = `output_${Date.now()}.dds`;
    const outputPath = path.join(tempDir, outputFileName);
    const args = [imagePath, outputPath, fixedValue];
    return new Promise((resolve, reject) => {
        execFile(executablePath, args, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing file: ${error}`);
                return reject(error);
            }
            fs.access(outputPath, fs.constants.F_OK, (err) => {
                if (err) {
                    return reject(new Error('Output file was not created'));
                }
                fs.readFile(outputPath, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    fs.unlink(outputPath, (err) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(data);
                    });
                });
            });
        });
    });
}

module.exports = {pngFile2DDSBuffer,pngBuffer2DDSBuffer};
