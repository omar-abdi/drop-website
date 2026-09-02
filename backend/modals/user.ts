import mongoose from "mongoose";

type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    gender: string;
    address: string;
    city: string;
    country: string;
}

const userSchema = new mongoose.Schema<User>({
    firstName: {
        type: String,
         required: true
         },
    lastName: {
         type: String,
          required: true
         },

    email: { 
        type: String, 
        required: true,
         unique: true 
        },
    password: {
         type: String, 
         required: true 
        },
    phoneNumber: { 
        type: String, 
        required: true 
    },    
    gender: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    country: { 
        type: String, 
        required: true 
    },
});

export default mongoose.model<User>("User", userSchema);    