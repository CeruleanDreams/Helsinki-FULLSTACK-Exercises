const mongoose = require("mongoose")

const supertest = require("supertest")

const  app = require("../app")
const { map } = require("lodash")
const Blog = require("../models/blogs")

const api = supertest(app) //wrapping app around supertest agent

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

      const blogsToSave = blogsToLoad.map(blog => new Blog(blog))
      const blogsAsPromises = blogsToSave.map(blog => blog.save())

      await Promise.all(blogsAsPromises) //Prevents beforeEach from passing to the next test without receiving a final promise for all promises
})

describe ("Blogs when GET request", () => {

    test("returned as JSON", async () => {

        blogs = await api.get('/api/blogs')
        .expect(200)
        .expect("Content-Type", /application\/json/)



    })

    test("correct amount returned", async () => {

        blogs = await api.get('/api/blogs');
        expect(blogs.body).toHaveLength(2); 
        //Don't forget that we're accessing the body,
        //not the entire response


    }) //Time to prevent it from failing due to test duration

    test("id is returned", async () => {

        blogs = await api.get('/api/blogs'); //Is an array don't forget
        
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

        await api.post('/api/blogs').send(newBlog).expect(201); //do not forget .send()

        blogs = await api.get('/api/blogs'); 

        expect(blogs.body).toHaveLength(3)


    });

    test("if likes missing initialised to 0 by default", async () => {

          const newBlog = {
            title: 'BRO',
            author: 'John',
            url: 'https://www.blower.com/about/?bpli=1'
          }

        await api.post('/api/blogs').send(newBlog).expect(201); //do not forget .send()

        blogs = await api.get('/api/blogs'); 

        console.log(blogs.body)

        blogs.body.map(blog => expect(blog.likes).toBeDefined)


    });

    test("if missing title or url, returns error 400", async () => {

        const newBlog = {
          author: 'John',
          url: 'https://www.blower.com/about/?bpli=1'
        }

      await api.post('/api/blogs').send(newBlog).expect(400)

  });
});

describe("Deleting or updating a blog", () => {

    test("Deleting a blog", async () => {
        let blogs = await api.get('/api/blogs'); 

        const firstBlogsId = blogs.body[0].id
        await api.delete('/api/blogs/' + firstBlogsId).expect(204) //deletes the first blog

        blogs = await api.get('/api/blogs');
        
        expect(blogs.body).toHaveLength(1) 

    });

    test("Updating a blog", async () => {

        const firstBlogUpdated = {
            title: 'Dee212z nuts',
            author: 'Johngr',
            url: 'https://www.blogger.com/about/?bpli=1',
            likes: 64
          };

        
        let blogs = await api.get('/api/blogs'); 

        const firstBlogsId = blogs.body[0].id

        await api.put('/api/blogs/' + firstBlogsId).send(firstBlogUpdated).expect(202)

        blogs = await api.get('/api/blogs');

        console.log(blogs.body)

        expect(blogs.body[0].likes).toBe(64);

    })
})

afterAll(async () => {
    await mongoose.connection.close()
})