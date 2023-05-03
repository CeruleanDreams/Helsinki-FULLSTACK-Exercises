const mongoose = require("mongoose")

const supertest = require("supertest")

const  app = require("../app")
const { map } = require("lodash")
const Blog = require("../models/blogs")

const api = supertest(app) //wrapping app around supertest agent

const testToken = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxvdmVMYWNlMTgiLCJpZCI6IjY0NTI3NmNiZjY5NmQwZTU5Nzk0MDU1ZSIsImlhdCI6MTY4MzEyNTk5OCwiZXhwIjoxNjgzMTQ3NTk4fQ.CHYwrMe3t4w-SeK5-WT53OHS4eOXO3U93YCjwimkWxk"

beforeEach(async ()=> {
    const blogsToLoad = [{
        title: 'Dee212z nuts',
        author: 'Johngr',
        url: 'https://www.blogger.com/about/?bpli=1',
        likes: 5
      },
      {
        title: 'Deez nuts',
        author: 'John',
        url: 'https://www.blogger.com/about/?bpli=1',
        likes: 6
      }]

      await Blog.deleteMany({})

      const blogsToSave = blogsToLoad.map(blog => api.post('/api/blogs').send(blog).set('Authorization', testToken)) //POSTing and not saving manually

      await Promise.all(blogsToSave) //Prevents beforeEach from passing to the next test without receiving a final promise for all promises
})

describe ("Blogs when GET request", () => {

    test("returned as JSON", async () => {

        const blogs = await api.get('/api/blogs').set('Authorization', testToken)
        .expect(200)
        .expect("Content-Type", /application\/json/)



    })

    test("correct amount returned", async () => {

        const blogs = await api.get('/api/blogs').set('Authorization', testToken);
        expect(blogs.body).toHaveLength(2); 
        //Don't forget that we're accessing the body,
        //not the entire response


    }) //Time to prevent it from failing due to test duration

    test("id is returned", async () => {

        const blogs = await api.get('/api/blogs').set('Authorization', testToken); //Is an array don't forget
        
        //console.log(blogs.body)

        blogs.body.map(blog => {
            expect(blog.id).toBeDefined();
            //console.log(blog.id);
        })
        //Don't forget that we're accessing the body,
        //not the entire response


    })
});

describe("Blogs when trying to be added", () => {

    test("successfully creates new blog", async () => {

        //Don't do this since blogsRouter already takes care of creating a new Blog!
        /*
        const newBlog = new Blog({
            title: 'BRO',
            author: 'John',
            url: 'https://www.blower.com/about/?bpli=1',
            likes: 9
          }) 
        */

        //rather:

          const newBlog = {
            title: 'BRO',
            author: 'John',
            url: 'https://www.blower.com/about/?bpli=1',
            likes: 5
          }

        await api.post('/api/blogs').send(newBlog).set('Authorization', testToken).expect(201); //do not forget .send()

        const blogs = await api.get('/api/blogs').set('Authorization', testToken); 

        expect(blogs.body).toHaveLength(3)


    });

    test("if likes missing initialised to 0 by default", async () => {

        const newBlog = {
            title: 'BRO',
            author: 'John',
            url: 'https://www.blower.com/about/?bpli=1'
          }

        await api.post('/api/blogs').send(newBlog).set('Authorization', testToken).expect(201); //do not forget .send()

        const blogs = await api.get('/api/blogs').set('Authorization', testToken); 


        blogs.body.map(blog => expect(blog.likes).toBeDefined)


    });

    test("if missing title or url, returns error 400", async () => {

        const newBlog = {
          author: 'John',
          url: 'https://www.blower.com/about/?bpli=1'
        }

      await api.post('/api/blogs').send(newBlog).set('Authorization', testToken).expect(400)

  });
});

describe("Deleting or updating a blog", () => {

    test("Deleting a blog", async () => {
        let blogs = await api.get('/api/blogs').set('Authorization', testToken); 

        console.log(blogs.body)

        const originalLength = blogs.body.length
        console.log(originalLength)
        
        const firstBlogsId = blogs.body[0].id

        await api.delete('/api/blogs/' + firstBlogsId).set('Authorization', testToken).expect(204) //deletes the first blog

        blogs = await api.get('/api/blogs').set('Authorization', testToken);
        
        expect(blogs.body).toHaveLength(originalLength - 1)
        console.log(blogs.body.length)

    });

    test("Updating a blog", async () => {

        const firstBlogUpdated = {
            title: 'Dee212z nuts',
            author: 'Johngr',
            url: 'https://www.blogger.com/about/?bpli=1',
            likes: 64
          };

        
        let blogs = await api.get('/api/blogs').set('Authorization', testToken); 

        const firstBlogsId = blogs.body[0].id

        await api.put('/api/blogs/' + firstBlogsId).send(firstBlogUpdated).set('Authorization', testToken).expect(202)

        blogs = await api.get('/api/blogs').set('Authorization', testToken);

        expect(blogs.body[0].likes).toBe(64);

    })

    test("Veriyfing that the users are populated with blogs", async () => {

      users = await api.get('/api/users').set('Authorization', testToken)
      users.body.map(user => console.dir(user.blogs))


  })
})

afterAll(async () => {
    await mongoose.connection.close()
})