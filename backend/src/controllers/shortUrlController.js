import { ShortURL } from "../models/shorturl.model.js";
import {nanoid as nanoId} from "nanoid";

export const createShortURL = async (req, res) => {
    try {
        let {originalUrl, title, expiresAt, customUrl} = req.body
        const userId = req.user.id
        let newNanoId = nanoId(7);

        while(true){
            const existing = await ShortURL.findOne({shortCode: customUrl })
            if(!existing) break;
            newNanoId = nanoId(7);
        }
        if(customUrl){
                const existing = await ShortURL.findOne({shortCode: customUrl })
                if(!existing){
                    newNanoId = customUrl;
                }
            }
        const newshortCode = await ShortURL.create({
            originalUrl,
            title,
            shortCode: newNanoId,
            expiresAt,
            userId
        })
        res.status(200).json({
            message: "Successfully generated short URL",
            data: newshortCode
        })

    }catch(error){
        console.error(error);
        res.status(500).json({
            
            message: error.message
        });

    }
}

export const redirectToOriginalUrl = async (req, res) => {
    try {
        const { shortcode } = req.params;
        const doc = await ShortURL.findOne({ shortCode: shortcode });
        if(!doc){
            return res.status(404).json({
                message: "Url does not exist"
            })
        }
        const originalUrl = doc.originalUrl;
        return res.redirect(originalUrl);
    }
    catch(error){
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
        //},{$})

    } catch (error) {
        console.error("ERROR UPDATING SHORT URL:",error);
        res.status(500).json({
            status: "INTERNAL SERVER ERROR",
            message:"ERROR UPDATING SHORT URL",
        })
    }
}

export const deleteShortURLController = async (req,res)=> {
    try {
        const {ShortURL} = req.params;

        const existed = await ShortURL.findOne({shortCode: shortURL});
        if(!existed){
            return res.status(404).json({
                status : "NOT_FOUND",
                message : "Short URL not found",
            });
        }
//soft delete
        existed.isActive = false;
        await existed.save();
        //hard delete
        res.status(200).json({
            status: "Success",
            message: "Short URL deleted successfully",
        });

    } catch (error) {
        console.error("ERROR DELETING SHORT URL:",error);
        res.status(500).json({
            status: "INTERNAL SERVER ERROR",
            message:"ERROR DELETING SHORT URL",
        });
    }
}