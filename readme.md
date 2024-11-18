# PNG to DDS Converter

This npm package provides functions to convert PNG files or buffers into DDS file buffers. It supports both Windows and macOS operating systems.

## Installation

To install the package, run:

```bash
npm install png2dds
```

## Usage

### Importing the Functions

You can import the functions from the package as follows:

```javascript
const { pngFile2DDSBuffer, pngBuffer2DDSBuffer } = require('png2dds');
```

### Converting a PNG File to a DDS Buffer

To convert a PNG file to a DDS buffer, use the `pngFile2DDSBuffer` function:

```javascript
const { pngFile2DDSBuffer } = require('png2dds');

const imagePath = '/path/to/your/image.png';

pngFile2DDSBuffer(imagePath)
    .then((buffer) => {
        console.log('DDS Buffer:', buffer);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
```

### Converting a PNG Buffer to a DDS Buffer

To convert a PNG buffer to a DDS buffer, use the `pngBuffer2DDSBuffer` function:

```javascript
const { pngBuffer2DDSBuffer } = require('png2dds');
const fs = require('fs');

const pngBuffer = fs.readFileSync('/path/to/your/image.png');

pngBuffer2DDSBuffer(pngBuffer)
    .then((ddsBuffer) => {
        console.log('DDS Buffer:', ddsBuffer);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
```

## Functions

### `pngFile2DDSBuffer(imagePath)`

- **Parameters**: 
  - `imagePath` (string): The path to the PNG file.
- **Returns**: 
  - A promise that resolves to a buffer containing the DDS file data.

### `pngBuffer2DDSBuffer(buffer)`

- **Parameters**: 
  - `buffer` (Buffer): The buffer containing the PNG file data.
- **Returns**: 
  - A promise that resolves to a buffer containing the DDS file data.

## Executables

The package includes executables for both Windows and macOS:
- `img2dds.exe` for Windows
- `img2dds` for macOS

These executables are based on a Rust project by the GitHub user [ScanMountGoat](https://github.com/ScanMountGoat/image_dds).