function email(data) {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(data).toLowerCase()) && data.length > 2;
}

function alpha(data) {
    const re = /^[a-zA-Z]*$/;
    return re.test(String(data)) && data.length > 0;
}
function num(data) {
    const re = /^[0-9]*$/;
    return re.test(String(data)) && data.length > 3;
}