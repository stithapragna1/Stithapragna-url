import {ShortURL} from "../models/shorturl.model.js";
import {nanoid} from "nanoid";


export const createShortURL = async (req, res) => {
    try {
        let {originalURL, title, expiresAt,customUrl} = req.body    
        let newNanoId = nanoid(7);
        const userId = req.user.id;
        

        while(true)
        {
          const existing = await ShortURL.findOne({shortCode: newNanoId})
           if(!existing)
           {
            break;
           }
           newNanoId = nanoid(7)
           
        }
        if(customUrl)
        {
            const existing = await ShortURL.findOne({shortCode: customUrl})
            if(!existing)
                {
                    newNanoId = customUrl;
                }
            
        }

        const newShortCode = await ShortURL.create({
            originalUrl: originalURL,
            title,
            shortCode : newNanoId,
            expiresAt,
            userId
        })

        res.status(200).json({
            message:"Successfully generated short URL",
            data: newShortCode
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        })
    }
}

export const redirectToOriginalUrl = async() => {
    try{
        const {shortCode} = req.params;

        const doc = await ShortURL.findOne({ shortCode });
        if(!doc)
        {
            return res.status(404).json({
                message: "Url does not exist"
            })        
        }
        const originalUrl = doc.originalUrl;
        return res.redirectToOriginalUrl;
    }
    catch(error)
    {
        console.error("Error in redirect");
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateShortURLController = async (req,res)=> {
    try {
        const {ShortURL} = req.params;

        const updatedData = req.body;

        const existed = await ShortURL.findOne({shortCode: shortURL});
        if(!existed){
            return res.status(404).json({
                status : "NOT_FOUND",
                message : "Short URL not found",
            })
        }
        Object.assign(existed, updatedData);
        await existed.save();
        //method 2
        // const updatedRecord = await ShortURL.findOneandUpdate({
        //shortCode: shortURL
        //},{$set: updatedData},{new: true})

    } catch (error) {
        console.error("ERROR UPDATING SHORT URL:",error);
        res.status(500).json({
            status: "INTERNAL SERVER ERROR",
            message:"ERROR UPDATING SHORT URL",
        })
    }
}

export const deleteShortURLController = async(req,res)=> {
    try{
        const {shortURL} = REQ.PARANS

        const existed = await ShortURL.findOne({shortCode: shortURL});
        if(!existed)
        {
            return res.status(404).json({
                status: "NOT_FOUND",
                message: "Short URL not found",
            });
        }
    
    existed.isActive = false;
    await existed.save();

    res.status(200).json({
        status: "Success",
         message: " Short URL deleted "
    });
}
    catch (error)
    {
        console.error("Error deleting short URL",error);
        res.status(500).json({
            status: "INTERNAL SERVER ERROR",
            message:"ERROR DELETING SHORT URL",
        });
    }
}