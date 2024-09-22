function hexToRgb(hex) {
    hex = hex.substring(1);
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
}

function rgbToHex(r, g, b) {
    let hexR = r.toString(16).padStart(2, '0').toUpperCase();
    let hexG = g.toString(16).padStart(2, '0').toUpperCase();
    let hexB = b.toString(16).padStart(2, '0').toUpperCase();
    return `#${hexR}${hexG}${hexB}`;
}

function complementaryColor(hex) {
    let [r, g, b] = hexToRgb(hex);
    let compR = 255 - r;
    let compG = 255 - g;
    let compB = 255 - b;
    return rgbToHex(compR, compG, compB);
}

let input = `3
#FFFFFF
#11E43D
#A12FDB`;

let lines = input.trim().split('\n');
let t = parseInt(lines[0], 10);
for (let i = 1; i <= t; i++) {
    let hexCode = lines[i].trim();
    console.log(complementaryColor(hexCode));
}
