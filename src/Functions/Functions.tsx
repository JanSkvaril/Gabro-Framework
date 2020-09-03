/**
 * @file Contains usefull functions
 * @author Jan Škvařil 
 */


/**
 * @brief Cretes "url(path)" string
 * @param {string} path path to file
 * @returns {string} 
 */
function GetImage(path: string): string {
    return "url(" + path + ")";
}

export {
    GetImage
}