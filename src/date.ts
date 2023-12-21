import TimeAgo from 'javascript-time-ago'

// English.
import zh from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(zh);
const timeAgo = new TimeAgo("zh-Hans-CN");

function formatDate(input: Date | string) {
    const date = typeof input === "string" ? new Date(input) : input;
    return timeAgo.format(date, "twitter") as string;
}


export {formatDate}
