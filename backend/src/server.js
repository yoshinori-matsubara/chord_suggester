const express = require("express");
const environment = process.env.NODE_ENV || "development";
const config = require("../knexfile.js")[environment];
const knex = require("knex")(config);
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 8080; // 使用するポート番号を指定してください

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.static("public"));
app.use(express.json());

// コード提案API
app.get("/api/chord-progressions", async (req, res) => {
  const mood = req.query.mood;
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const callAi = (async () => {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `mood: ${mood}\nPlease suggest some chord progressions that match the mood above.
            # rules #
            ・Answer as Json {id,chordProgression}
            ・Type of "id" is number and "chordProgression" is string
            ・For the chord progression, please answer in the form of connecting each chord with a hyphen (e.g. "F-G-Em-Am")
            ・Return should be the single Array[] that includes some objects like {id,chordProgression}`,
          },
        ],
      });
      return completion.data.choices[0].message;
    })();

    callAi.then((result) => {
      console.log(result);
      res.set("content-type", "application/json");
      res.status(200);
      res.send(result);
    });
  } catch (error) {
    console.error("API呼び出しエラー:", error.message);
    res.status(500).json({ error: "API呼び出しエラー" });
  }
});

// コード保存API
app.post("/api/chord-progressions", async (req, res) => {
  const { chordProgression, mood } = req.body;
  console.log(chordProgression);
  try {
    // ここにデータベースへの保存処理を実装
    await knex("chords").insert({
      chord_progression: chordProgression,
      mood: mood,
    });
    const result = await knex.select("*").from("chords");
    // 保存処理が成功した場合は適切なレスポンスを返す
    res.status(200).json({ message: "Chord progression saved successfully!" });
  } catch (error) {
    console.error("データベース保存エラー:", error.message);
    res.status(500).json({ error: "Failed to save chord progression." });
  }
});

//全ての保存済みコード進行を取得
app.get("/api/my-chord-progressions", async (req, res) => {
  try {
    const db = await knex.select("*").from("chords");
    res.status(200).json(db);
  } catch (error) {
    console.error("データベース保存エラー:", error.message);
    res.status(500).json({ error: "Failed to save chord progression." });
  }
});

app.listen(port, () => {
  console.log(`サーバーがポート${port}で起動しました。`);
});
