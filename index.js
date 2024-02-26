
import express from 'express';
import cors from 'cors'
import translate from 'translate';
import LanguageDetect from 'languagedetect';
const lngDetector = new LanguageDetect();
const app = express ();




app.use (cors ());
app.use (express.json ());
translate.engine=='libre';

app.get("/",(req,res)=>{
    res.send("API Working");
});

app.post("/translate-to-french", async (req, res) => {
    try {
        
        if(!req.body.text)
        {
            return res.status(400).send({ message: "text is required" });
        }

        const languageOfText=lngDetector.detect(req.body.text);
        if(languageOfText[0][0]!='english')
        {
            throw new Error("text is not in english");
        }
        const { text } = req.body;
        const translation = await translate(text,"fr") ;
        res.send({ "translation":translation }).json() ;
        
    } catch (error) {
        console.error(error); 
        res.status(400).json({ message: error.message });
    }
  });

const port=process.env.PORT || 3000
   
app.listen(port, () => {
 console.log(`App listening at port ${port}`);
});