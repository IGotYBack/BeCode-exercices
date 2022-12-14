import User from "../../models/user.mjs";
import Profile from "../../models/profile.mjs";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const sign = promisify(jwt.sign)

const loginUser = async (req, res) => {
    const { emailLog, passwordLog } = req.body;
    const user = await User.find({ email: emailLog });


    if (user.length === 0) {
        return res.status(404).send({ error: 'This user does not exist' })
    }

    const match = await bcrypt.compare(passwordLog, user[0].password);

    if (!match) {
        return res.status(403).send({ error: 'Wrong password' })
    }

    const profile = await Profile.find({ user_id: user[0]._id });
    console.log(profile)

    try {
        const token = await sign(
            {
                profile_id: profile[0]._id
            },
            process.env.jwtPsw,
            {
                algorithm: 'HS512',
                expiresIn: '6h',
            }
        );
        const tokito = {
            tokenKey: token
        }
        res.json(tokito)
        // res.redirect('/static');
    } catch (err) {
        console.log(`The login failed : ${err} ${err.message}`)
    }

}

export default loginUser 