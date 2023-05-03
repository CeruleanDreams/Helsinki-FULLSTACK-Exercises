const mongoose = require("mongoose")

const supertest = require("supertest")

const  app = require("../app")

const api = supertest(app) 

test("Token received back", async () => {
    const tokenMessage = await api.post("/api/login").send({
        username: "LoveLace18",
        password: "JoeMama"
    }).expect(200)

    console.log(tokenMessage.body)

    expect(tokenMessage.body).toHaveProperty("token")
}, 20000)

