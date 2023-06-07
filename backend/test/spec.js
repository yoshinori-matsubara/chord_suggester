const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const URL = "http://localhost:8080";
chai.use(chaiHttp);

// テストはserver.jsでサーバー(localhost:8080)を立てた状態で実行
describe("Chord Progression API", () => {
  describe("GET /api/chord-progressions", () => {
    it("should suggest chord progressions based on mood", (done) => {
      mood = "happy";
      chai
        .request(URL)
        .get(`/api/chord-progressions/?mood=${mood}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(JSON.parse(res.body.content)).to.be.an("array");

          done();
        });
    }).timeout(60 * 1000);
  });

  describe("GET /api/my-chord-progressions", () => {
    it("should return stored chord progressions", (done) => {
      chai
        .request(URL)
        .get("/api/my-chord-progressions")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("array");

          done();
        });
    }).timeout(60 * 1000);
  });

  describe("POST /api/chord-progressions", () => {
    it("should save the chord progression to the database", (done) => {
      const requestBody = {
        chordProgression: "C-G-Am-F",
        mood: "happy",
      };

      chai
        .request(URL)
        .post("/api/chord-progressions")
        .send(requestBody)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.deep.equal({
            message: "Chord progression saved successfully!",
          });

          done();
        });
    }).timeout(60 * 1000);
  });
});
