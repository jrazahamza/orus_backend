const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const Question = require('../models/questionPropmt');  
const router = express.Router();


const questions = [
    {
        question: 'How would you describe your personality?',
        options: ['luxury Traveler', 'Adventure seeker', 'Family Traveler', 'Backpacker']
    },
    {
        question: 'Select activities you would like to include.',
        options: ['Winter Activities', 'Food & Entertainment', 'Adventure', 'Sports']
    },
    {
        question: 'Will you be travelling with a companion?',
        options: ['Solo', 'Couple', 'Family' , 'Friends']
    }
];

router.post("/question-prompt", async (req, res) => {
    const { responses } = req.body; 

   
    if (!responses || responses.length !== questions.length) {
        return res.status(400).json({ error: 'You must answer all questions' });
    }

    let userSummary = "";
    responses.forEach((response, index) => {
     
        if (!questions[index].options.includes(response)) {
            return res.status(400).json({ error: `Invalid response for question: "${questions[index].question}"` });
        }

        userSummary += `${questions[index].question} Answer: ${response}\n`;
    });

    try {
       
        const newQuestion = new Question({
            question: userSummary,
            response: "Pending AI Response"  
        });
        await newQuestion.save();

  
        const aiResponse = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: userSummary,
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

    
        const finalAnswer = aiResponse.data.choices[0].message.content;

 
        newQuestion.response = finalAnswer;
        await newQuestion.save();

        res.status(200).json({
            response: finalAnswer
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
