const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
const expect = chai.expect;
chai.use(chaiHttp);

// Create a stub for the WebSocket
const wsStub = function () {};
wsStub.prototype.on = sinon.stub();

// Proxyquire to replace 'ws' module in your app
const app = proxyquire("../index", { foo: {}, ws: wsStub });

describe("WebSocket connection on /connect", () => {
  it("should respond with 200 and 'open' when WebSocket connection is opened", (done) => {
    // Simulate the 'open' event for WebSocket
    wsStub.prototype.on.callsFake(function (event, callback) {
      if (event === "open") {
        callback();
      }
    });

    chai
      .request(app)
      .get("/connect")
      .end((_, res) => {
        expect(wsStub.prototype.on.calledWith("open")).to.be.true; // Check 'open' event listener was set
        expect(res).to.have.status(200);
        expect(res.text).to.equal("open");
        done();
      });
  });
});
