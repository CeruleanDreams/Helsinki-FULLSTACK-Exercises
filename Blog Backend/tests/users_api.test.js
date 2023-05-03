const mongoose = require("mongoose")

const supertest = require("supertest")

const  app = require("../app")
const User = require("../models/users")

const api = supertest(app) //wrapping app around supertest agent

beforeEach(async () => {
    const usersToLoad = [{
        name: "Juan",
        username: "HungryMan21",
        password: "Silv182"
      },
      {
        name: "Joe",
        username: "LoveLace18",
        password: "JoeMama"
      }]
      
      
      await User.deleteMany({})

      const usersAsPromises = usersToLoad.map(user => api.post('/api/users').send(user)) 

      await Promise.all(usersAsPromises) //Prevents beforeEach from passing to the next test without receiving a final promise for all promises
})

describe ("Users when GET request", () => {

    test("returned as JSON", async () => {

        await api.get('/api/users')
        .expect(200)
        .expect("Content-Type", /application\/json/)



    }, 10000)

    test("correct amount returned", async () => {

        const users = await api.get('/api/users');
        expect(users.body).toHaveLength(2); 
        //Don't forget that we're accessing the body,
        //not the entire response


    }) //Time to prevent it from failing due to test duration

    test("id is returned", async () => {

        const users = await api.get('/api/users'); //Is an array don't forget
        
        //console.log(users.body)

        users.body.map(user => {
            expect(user.id).toBeDefined();
            //console.log(user.id);
        })
        //Don't forget that we're accessing the body,
        //not the entire response


    })
});

describe("Users when trying to be added", () => {

    test("successfully creates new user", async () => {

          const newUser = {
            name: "Hally",
            username: "FlyingComet1",
            password: "12h2"
            
          }

        await api.post('/api/users').send(newUser).expect(201); //do not forget .send()

        const users = await api.get('/api/users'); 

        expect(users.body).toHaveLength(3)


    }, 10000);

    test("if missing password, returns error 400", async () => {
        const newUser = {
        name: "John",
        username: "Hungry322"
        }

      await api.post('/api/users').send(newUser).expect(400)   

    });

    test("if missing username, returns error 400", async () => {
        const newUser = {
        name: "John",
        password: "JoeMama"
        }

      await api.post('/api/users').send(newUser).expect(400)   

    });

    test("if invalid password, returns error 400", async () => {
        const newUser = {
        name: "John",
        username: "Hungry322",
        password: "Ja"
        }

      await api.post('/api/users').send(newUser).expect(400)   

    });
});

describe("Deleting or updating a user", () => {

    test("Deleting a user", async () => {
        let users = await api.get('/api/users'); 

        const firstUsersId = users.body[0].id
        await api.delete('/api/users/' + firstUsersId).expect(204) //deletes the first user

        users = await api.get('/api/users');
        
        expect(users.body).toHaveLength(1) 

    });

    test("Updating a user", async () => {

        const firstUserUpdated = {
            name: "Johnny",
            username: "HungaryOverAustria",
          };

        
        let users = await api.get('/api/users'); 

        const firstUsersId = users.body[0].id

        await api.put('/api/users/' + firstUsersId).send(firstUserUpdated).expect(202)

        users = await api.get('/api/users');

        // console.log(users.body);

        expect(users.body[0].name).toBe("Johnny");
        expect(users.body[0].username).toBe("HungaryOverAustria");

    })
})

afterAll(async () => {
    await mongoose.connection.close()
})