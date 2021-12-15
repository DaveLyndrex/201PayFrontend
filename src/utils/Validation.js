const Validation = {
    required: (val, field) => {
        return !!val || `The ${field} field is required`
    },
    min: (val, field, count) => {
        return (val && val.length >= count) || `The ${field} field should atleast ${count} characters.`
    },
    email: (val, field) => {
        const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return validEmail.test(val) || `The ${field} field should be valid email.`
    },
    date:(val, field) => {
        const validDate = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
        return validDate.test(val) || `The ${field} field should be valid date.`
    },
    integer: (val, field) => {
        const validNumber = /\d/g;
        return validNumber.test(val) || `The ${field} field should be valid number.`
    }
}

export default Validation