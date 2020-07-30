const bcrypt = require('bcrypt');

const { User} = require('./../../models');

const attemptLogin = async (requestBody) => {
    const username = requestBody.username;
    const password = requestBody.password;

    if (!username || !password)
        return {
            status: false,
            message: 'Username or password required'
        }
    
    const user = await User.findOne({
        where: {
            username: username
        },
        attributes: { exclude: ['htmlProfile'] }
    });

    return (!user || !bcrypt.compareSync(password, user.password)) ? {
        status: false,
        message: 'Username or Password not match'
    } : {
        status: true,
        message: 'Login success',
        user: user.dataValues
    }
}

module.exports = {
    attemptLogin
}