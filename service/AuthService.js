
const bcrypt = require('bcryptjs');

(User) => {
    exports.createUser = async (userInput) => {
        const user = await userWithEncodePassword(userInput);
        return user.save();
    }
    
    exports.userWithEncodePassword = async ({email, password, name, birth, phon, reg_dt}) => {
    
        const hashedPassword = await bcrypt.hash(password, 12); //password 암호화
    
        return new User({
            email, 
            password : hashedPassword, 
            name, 
            birth,
            phon
        });
    }
}

