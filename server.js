const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3000;



app.use(cors());
app.use(express.json());


const dbURI = "mongodb+srv://Abdulkareem:Miniclip18@cluster0.gh4p7.mongodb.net/orusDB?retryWrites=true&w=majority";

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error: ", err));


// mongoose.connect('mongodb+srv://Abdulkareem:Miniclip18@cluster0.gh4p7.mongodb.net/orusDB',
//     { useNewUrlParser: true, useUnifiedTopology: true })
//    .then(() => console.log('MongoDB connected'))
//    .catch(err => console.error('MongoDB connection error:', err));

//Routers:
const authRouter = require('./Routes/authRoute');
const questionsPromptRoutes = require('./Routes/questionPrompt');
const prompt = require('./Routes/prompt');
const userData = require('./Routes/userDataRoutes');

//API's:

app.use('/api', authRouter);
app.use('/api', questionsPromptRoutes);
app.use('/api', prompt);
app.use('/api', userData);

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});

