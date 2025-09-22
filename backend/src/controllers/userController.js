import { User } from "../models/user/user.model.js";
import { ShortURL } from "../models/shorturl.model.js";


export const getProfileOfUser=async(req,res)=>{
    try {
      const user = req.user;
      const userId = user.id;

      const dbUser = await User.findById(userId);
      return res.status(200).json({
        message: "User Profile!",
        data: dbUser
      })
      // console.log("Printing request user -> ",req.user);
      // res.status(200).json({
      //   message: "successfully printed the user profile",
      //   data: message,
      // });
    } catch (error) {
      console.error("Error in fetching user profile");
      res.status(500).json({
        message: "Error in getting user profile",
        error: error.message,
      });
    }
   
}
 export const getMyUrls = async (req, res) => {
     try {
       const user = req.user;
       const userId = user.id;

       const dbUser = await ShortURL.find({userId});
       return res.status(200).json({
         message: "My urls",
         data: dbUser,
       });
       // console.log("Printing request user -> ",req.user);
       // res.status(200).json({
       //   message: "successfully printed the user profile",
       //   data: message,
       // });
     } catch (error) {
       console.error("Error in fetching user profile");
       res.status(500).json({
         message: "Error in getting user profile",
         error: error.message,
       });
     }
 };