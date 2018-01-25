/**
 * Get current time in specific format
 */
export function getCurrentTime() {
    const now = new Date();

    let hours = (now.getHours() - 12 < 0) ? now.getHours() : now.getHours() - 12;
    hours = (hours < 10) ? `0${hours}` : hours;

    let mins = now.getMinutes();
    mins = (mins < 10) ? `0${mins}` : mins;

    let ampm = (now.getHours() - 12 < 0) ? 'am' : 'pm';

    return {
        hours: hours,
        mins: mins,
        ampm: ampm
    };
}
