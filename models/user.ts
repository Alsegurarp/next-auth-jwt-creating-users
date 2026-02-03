import { Schema, model, models} from "mongoose";
// Schema allows us to declare what we want to save

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [
            /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
            "Email is not valid"
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    fullname: {
        type: String,
        required: [true, "Full name is required"],
        select: false,
        minLength: [3, "Fullname must be at least 3 characters"],
        maxLength: [50, "Fullname can't be more than 50 characters"]
    }
});
// en password, el select es si puedes hacer el command SELECT
// pero no se debe mandar la contrasena ni el fullname de regreso al front

const User = models.User || model('User', userSchema);
export default User;