//Guid
var _guidHexMap = new Array(256);
for (var i = 0; i < 256; ++i) {
    _guidHexMap[i] = ((i < 16) ? '0' : '') + i.toString(16);
}

function _guidGetRand() {
    return (Math.random() * 4294967295) | 0;
}

export class Guid {
    private static _splitIndices: number[] = [3, 5, 7, 9];
    private _bytes: Uint32Array;
    private constructor(_bytes: Uint32Array) {
        this._bytes = _bytes
    }
    toString() {
        var index: number = 0;
        return this._bytes.reduce((acc, i) => {
            if (Guid._splitIndices.indexOf(index) >= 0) {
                acc += "-";
            }
            acc += _guidHexMap[i];
            index++;
            return acc;
        }, "");
    }
    valueOf() {
        return this._bytes;
    }
    static NewGuid() {
        var d0 = _guidGetRand();
        var d1 = _guidGetRand();
        var d2 = _guidGetRand();
        var d3 = _guidGetRand();

        var arr = new Uint32Array(16);

        arr[0] = d0 & 255;
        arr[1] = d0 >> 8 & 255;
        arr[2] = d0 >> 16 & 255;
        arr[3] = d0 >> 24 & 255;

        arr[4] = d1 & 255;
        arr[5] = d1 >> 8 & 255;

        arr[6] = d1 >> 16 & 15 | 64;
        arr[7] = d1 >> 24 & 255;

        arr[8] = d2 & 63 | 128;
        arr[9] = d2 >> 8 & 255;

        arr[10] = d2 >> 16 & 255;
        arr[11] = d2 >> 24 & 255;
        arr[12] = d3 & 255;
        arr[13] = d3 >> 8 & 255;
        arr[14] = d3 >> 16 & 255;
        arr[15] = d3 >> 24 & 255;

        return new Guid(arr);
    }
}