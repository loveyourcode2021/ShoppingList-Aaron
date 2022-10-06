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

function getCookieValue() {
    const name = "amazon_product_email"
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
}

function delete_cookie() {
    const name = "amazon_product_email"
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const setCurrentUser = (data) => {
    const endOfDay = new Date().setHours(23, 59, 59, 999)
    const expiry = new Date(endOfDay).toUTCString();
    document.cookie = `amazon_product_email=${data.user.email}; expires=${expiry}; path=/;`
}

const getCurrentUser = () => {
    return getCookieValue()
}
const generateReviewDateString = (date) => {
    const year = date.getFullYear();
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    return `Reviewed in Canada on ${month} ${dayOfMonth}, ${year}`;
}

export { generateReviewDateString, getCookieValue, delete_cookie, setCurrentUser,getCurrentUser }