const express = require('express');
const router = express.Router();

router.post('/suggestion', async(req, res)=>{
    const {prompt} = req.body;
    if(!prompt){
        return res.status(400).json({error: 'Prompt is Required!'})
    }
    try{
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );
        const message = response.data.choie[0].message.content;
        res.json({message});
    }  catch(error){
        console.error('Error from api response ');
    }
    
})
module.exports = router;