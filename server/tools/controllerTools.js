exports.checkToken = function (req) {
    var token = req.headers["authorization"];
    if (token === null || token === undefined) {
        return null;
    }
    return token.substring("Bearer ".length);;
};

exports.Error = function (mes, code) {
    return { message: mes, status_code: code };
}

exports.findByProperty = function (array, value, property) {
    var item = array.find((v, i, a) => {
        return v[property] === value;
    });
    return item;
}