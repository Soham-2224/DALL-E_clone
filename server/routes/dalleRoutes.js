import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import fetch from "node-fetch";

dotenv.config();

const router = express.Router();

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
    res.send("welcome to my api where you can generate ai images");
});

router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body;

        // const aiResponse = await openai.createImage({
        //     prompt: "a dog in bathtub",
        //     n: 1,
        //     size: "1024x1024",
        //     response_format: "b64_json",
        // });

        // const image = aiResponse.data.data[0].b64_json;

        // res.status(200).json({ photo: image });

        let options = {
            method: "POST",
            headers: {
                Authorization: process.env.OPENAI_API_KEY,
                "Content-Type": "application/json",
            },
            body: `{"prompt":"${prompt}","n":1,"size":"1024x1024", "response_format": "b64_json"}`,
        };

        const response = await fetch("https://api.openai.com/v1/images/generations", options).then((res) => {
            return res.json();
        });

        const image = response?.data[0].b64_json;

        res.status(200).json({ photo: image });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

export default router;
