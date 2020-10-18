// export type jmeno = string

/**
 * Color of the text or general color.
 * 
 * * rgb value `"rgb(15, 35, 69)"`
 * * rgba value `"rgba(15, 35, 69, 0.5)"`
 * * hex value `"#584659"`
 * * name of the color `"pink"`
 */
export type color = string;

/**
 * Color/img of the background. You can enter:
 * 
 * * rgb value `"rgb(15, 35, 69)"`
 * * rgba value `"rgba1(5, 35, 69, 0.5)"`
 * * hex value `"#584659"`
 * * name of the color `"pink"`
 * * image source `{ GetImage(require('./path/to/img.jpg')) }`
 */
export type bg = string;

/**
 * Path to a file: `{ require("./myDir/myFile.file") }`
 */
export type filePath = string;

/** A lot of text `"Lorem Ipsum dolor ..."` */
export type richText = string;

/** Number of pixels: 120px - for props like height etc. */
export type numberOfPixels = string;




