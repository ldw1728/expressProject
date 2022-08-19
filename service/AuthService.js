
const bcrypt = require('bcryptjs');// password 암호화

module.exports = (User) => { //function의 매개변수를이용한 의존성 주입.

    const userService = {};
    
    
    userService.userWithEncodePassword = async ({email, password, name, birth, phon, reg_dt}) => {
    
        const hashedPassword = await bcrypt.hash(password, 12); //password 암호화
    
        return new User({
            email, 
            password : hashedPassword, 
            name, 
            birth,
            phon
        });
    }

    // create User
    userService.createUser = async (userInput) => {
        const user = await userService.userWithEncodePassword(userInput);
        return user.save();
    }
    


    return userService;
}

