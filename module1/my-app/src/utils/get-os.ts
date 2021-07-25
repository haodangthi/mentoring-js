export function getOS() {
    const userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = [ 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K' ],
        windowsPlatforms = [ 'Win32', 'Win64', 'Windows', 'WinCE' ],
        iosPlatforms = [ 'iPhone', 'iPad', 'iPod' ]
    let os

    if (macosPlatforms.indexOf(platform) !== -1 || iosPlatforms.indexOf(platform) !== -1) {
        os = 'Apple'
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows'
    } else if (/Android/.test(userAgent)) {
        os = 'Android'
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux'
    }

    return os
}
