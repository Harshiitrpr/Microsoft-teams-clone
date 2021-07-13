const fixTwoDigits = (number) => {
    return ("0" + number).slice(-2);
}

// geting time as string for today, else data as string
export const getMessageDateOrTime = (date) => {
    if (date !== null) {
        const dateObj = new Date(date);
        const dateDetails = {
            date: fixTwoDigits(dateObj.getDate()),
            month: fixTwoDigits(dateObj.getMonth() + 1),
            year: dateObj.getFullYear(),
            hour: fixTwoDigits(dateObj.getHours()),
            minutes: fixTwoDigits(dateObj.getMinutes())
        }
        const currentDateObj = new Date();
        const currentDateDetails = {
            date: fixTwoDigits(currentDateObj.getDate()),
            month: fixTwoDigits(currentDateObj.getMonth() + 1),
            year: fixTwoDigits(currentDateObj.getFullYear()),
            hour: fixTwoDigits(currentDateObj.getHours()),
            minutes: fixTwoDigits(currentDateObj.getMinutes())
        }
        if (dateDetails.year !== currentDateDetails.year && dateDetails.month !== currentDateDetails.month && dateDetails.date !== currentDateDetails.date) {
            return dateDetails.date + '-' + dateDetails.month + '-' + dateDetails.year;
        } else {
            return dateDetails.hour + ':' + dateDetails.minutes + ` ${dateDetails.hour < 12 ? 'AM' : 'PM'}`
        }
    }
    return '';
}