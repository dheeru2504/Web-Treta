import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {

        id: {
            type: String,
        },
        employee_name: {
            type: String,
            required: true,
            trim: true,
        },


        employee_salary: {
            type: Number,
            required: true,
        },

        employee_age: {
            type: Number,
            required: true,
        },
        profile_image: {
            type: String
        }


    },
    // { timestamps: true }
);

export default mongoose.model("employees", employeeSchema);
