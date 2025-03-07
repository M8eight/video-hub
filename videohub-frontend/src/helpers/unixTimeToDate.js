import moment from 'moment';

export default function unixTimeToDate(psqlTimestamp) {
    return moment.unix(psqlTimestamp).format("HH:mm DD.MM.YYYY");
}