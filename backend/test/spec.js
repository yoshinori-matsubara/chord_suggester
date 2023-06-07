const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const URL = "http://localhost:8080";

chai.use(chaiHttp);

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
          expect(JSON.parse(response.data.content)).to.be.an("array");

          done();
        });
    }).timeout(60 * 1000);
  });

  describe("POST /api/chord-progression", () => {
    it("should save the chord progression to the database", (done) => {
      const requestBody = {
        chordProgression: ["C", "G", "Am", "F"],
        mood: "happy",
      };

      chai
        .request(URL)
        .post("/api/chord-progression")
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
