module.exports = {
    stringify: function (val) {
        if (typeof val === 'object') {
            val = JSON.stringify(val, true);
        } else {
            val = val.toString();
        }
        return val.length > 140 ? val.substr(0, 137) + '...' : val;
    }
};

