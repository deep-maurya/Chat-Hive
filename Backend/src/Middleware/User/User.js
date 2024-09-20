const { UserModel } = require("../../Models/User");

const Personal_Details = async (req,res) => {
    const user_id = req.user.user_id;
    try {
        const data = await UserModel.findOne({_id:user_id});
        res.json(data)
    } catch (error) {
        res.json({messege:error})
    }
}

module.exports = {
    Personal_Details
}