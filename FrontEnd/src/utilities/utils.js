const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]


const generateReviewDateString = (date) => {
    const year = date.getFullYear();
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    return `Reviewed in Canada on ${month} ${dayOfMonth}, ${year}`;
}

export { generateReviewDateString }