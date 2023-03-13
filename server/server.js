const  express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./DB/models/userModel');
const QuestionDB = require('./DB/models/questionModel.js');
const connection = require('./DB/userDB');
const UserRecordR = require('./routes/userRecordR');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET_KEY  = '!@#$%^&*(WERYIOKGFDCVBNM<>955956596#$%^j8&Y*tG*76**&';

const app = express();
app.use(cors());
app.use(express.json());

connection();
//console.log(process.env.DB);


app.post('/api/taketest', async(req, res) => {
    try {
        const {checkboxValues, testSize} = req.body;
        console.log(testSize);
        const filteredObject = Object.fromEntries(
            Object.entries(checkboxValues).filter(([key, value]) => value === true)
        );
        const keys = Object.keys(filteredObject);
        let result = keys.map(async(item) => {
        let res = await QuestionDB.find({tags: { $in: item}}).limit(parseInt(testSize));
        return res;
        });

        result = await Promise.all(result);
        if (!result) {
            return res.json({status: 'ok', error: 'choose valid option'});
        }
        return res.json({status: 'ok', data: result, subject: keys});

    } catch(error) {
        return res.json({status: 'ok', error: error})
    }
})

app.use('/', UserRecordR);


app.post('/api/register', async(req, res) => {
    let {username, password, firstname, lastname, dateofbirth, mothername} = req.body;
    console.log(req.body);
    if (!username || typeof username !== 'string') {
        return res.json({staus: 'error', error: 'Invalid Username'});
    }
    if (!password || typeof password !== 'string') {
        return res.json({staus: 'error', error: 'Invalid Password'});
    }
    if (!firstname || typeof firstname !== 'string') {
        return res.json({staus: 'error', error: 'Invalid first name'});
    }
    if (!lastname || typeof lastname !== 'string') {
        return res.json({staus: 'error', error: 'Invalid last name'});
    }
    if (password.length < 8) {
        return res.json({
            status: 'error',
            error: "invalid password length, should bee at least 8 charcters"
        })
    }
    password = await bcrypt.hash(password, 10);
    try {
        const response = await User.create({
            firstname, lastname, email: username, password, dateofbirth, mothername
        })
        console.log('user created Successfully', response);
        res.json({status: 'ok', data: "success"});
    } catch(error) {
        console.log(error);
        if (error.code = 11000) {
            return res.json({staus: 'error', error: error.errmsg.split(':')[0]});
        }
        throw error;
    }
})

async function comp(str1, str2) {
    console.log(await bcrypt.compare(str1, str2));
    return await bcrypt.compare(str1, str2);
}

app.post('/api/login', async(req, res) => {
    let {email, password} = req.body;
    console.log(email, password);
    try {
        const user = await User.findOne({email}).lean();
        //console.log(user);

        if (!user) {
            return res.json({status: 'error', error: 'Invalid username or password'})
        }
        //comp(password, user.password);
        if (await bcrypt.compare(password, user.password)) {
            //correct password
            const token = jwt.sign({
                id: user._id,
                email: user.email
            }, JWT_SECRET_KEY);
            return res.json({status: 'ok', data: token, email: email})
        } else {
            return  res.json({status: 'error', error: 'Invalid username or password'});
        }
    } catch (err) {
        //console.error(JSON.stringify(err));
        return  res.json({status: 'error', error: 'Invalid username or password'});
    }    
});


//app.use('/', loginRoutes);

let foundUser;
function checkFoundUser() {
    console.log(foundUser.email);
}
app.post('/api/changePasswordOne', async(req, res) => {
    let {email, passkey} = req.body;
    passkey = `${passkey.split(/(\d+)/)[0]}${passkey.split(/(\d+)/)[1]}`;
    console.log(passkey);
    try {
        const user = await User.findOne({email}).lean();
        if (!user) {
            return res.json({status: 'error', error: 'Invalid email'})
        }
        foundUser = user;
        const [mothername, birthyear] = [user.mothername, user.dateofbirth.split("-")[0]];
        if (passkey == `${mothername}${birthyear}`) {
            return res.json({status: 'ok', data: "user found"});
        }
    } catch (err) {
        return  res.json({status: 'error', error: 'Invalid email or passkey'});
    }    
});


app.post('/api/changePasswordTwo', async(req, res) => {
    const {newpassword, confirmpassword} = req.body;
    //console.log(newpassword, confirmpassword)
    try {
        if(!foundUser && newpassword !== confirmpassword) {
            return res.json({status: 'error', error: 'passwords do not match'});
        }
        const password = await bcrypt.hash(newpassword, 10);
        const response = await User.updateOne(
            {
                password: foundUser.password
            }, 
            {
                $set: {password: password}
            }
        );
        foundUser = null;
        return res.json({status: 'ok', data: 'password changed!'})
    } catch(error) {
        return res.json({status: 'error', error: 'account not found'});
    }
})



app.listen(3000, () => {console.log('running on 3000')});