/**
 * Converts a duration given in seconds to a string in the format HH:MM:SS
 * @param {string} str the duration in seconds
 * @returns {string} The duration in the format HH:MM:SS
 */
export default function toHHMMSS(str) {
    var sec_num = parseInt(str, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    hours = hours + ':'
    minutes = minutes + ':'
    if (hours === "00:") { hours = "" }
    if (minutes === "00:") { hours = "" }
    return hours + minutes + seconds;
}