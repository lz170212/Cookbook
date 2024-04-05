import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req,res)=>{
    res.json({
        message:"Api route is working",
    });
};
export const updateUser= async (req,res,next) =>{
    //req.params.id => /api/user/update/:id
    //req.user.id  in verifyUser.js after jwt verified set req.user=user of current session
    //check can update or not
    if(req.user.id != req.params.id){
        return next(errorHandler(401, 'You can only update your own account!'));
    }
    //update
    //crypt password
    //connect to mongoDB find the data and update
    try {
        if (req.body.password) {
          req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
    
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
              avatar: req.body.avatar,
            },
          },
          { new: true } // return new version of doc
        );
        //response everything except password
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);

      } catch (error) {
        next(error);
      }
    


}

export const getMyStores = async (req, res, next) => {
  try{
    const data = await User.findOne({_id: req.user.id})
    .select("my_stores -_id")
    res.status(200).json(data);
  } catch(err){
      next(err);
}
}