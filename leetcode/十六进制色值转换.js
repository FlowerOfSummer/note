// 十六进制色值转换成rgba，支持4位和7位十六进制
function hexToRGBA(hex, alpha = 1) {
  if (hex.length === 4) {
    const r = parseInt(hex[1] + hex[1], 16);
    const g = parseInt(hex[2] + hex[2], 16);
    const b = parseInt(hex[3] + hex[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else if (hex.length === 7) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    throw new Error("Invalid hex color format");
  }
}

// 示例
const hexColor = "#FF5733";
const rgbaColor = hexToRGBA(hexColor, 0.5);
console.log(rgbaColor);

// rgba转换成十六进制色值
function rgbaToHex(r, g, b, a = 1) {
  const toHex = (value) => {
    const hex = Math.round(value).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const alpha = Math.round(a * 255);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
}

// 示例
const rgbaValues = { r: 255, g: 87, b: 51, a: 0.5 };
const hexColorFromRGBA = rgbaToHex(rgbaValues.r, rgbaValues.g, rgbaValues.b, rgbaValues.a);
console.log(hexColorFromRGBA);
