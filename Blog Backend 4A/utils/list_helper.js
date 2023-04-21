const { countBy } = require("lodash");

lodash = require("lodash")

const dummy = blogs => 1

const totalLike = blogs => 
blogs.reduce( (sum, blog) => sum + blog.likes, 0)

const getMostPopularAuthor = blogs => {
    authors = lodash.countBy(blogs, "author")

    author = lodash.reduce(authors, (result, value, key) => {
        return value > result.blogs ? {author: key, blogs: value} : result  
    }, {author: "None", blogs: 0});

    return author
};


//Did something wrong; likes and authors should be separate

const getMostLikedAuthor = blogs => {
    blogs = lodash.map(blogs, (blog) => {
        emptyColl = {};
        emptyColl[blog.author] =  blog.likes;
        return emptyColl;
        });

    //console.log(blogs)
    //We have an array of objects, not just a object of objects

    authors = lodash.reduce(blogs, (result, blog) => {

        result[Object.keys(blog)[0]] ? result[Object.keys(blog)[0]] += Object.values(blog)[0] : result[Object.keys(blog)[0]] = Object.values(blog)[0]
        return result

    }, {})

    console.log(authors)

    author = lodash.reduce(authors, (result, value, key) => {
            if (result.likes < value){
                return {author: key, likes: value}
            }
            else{
                return result
            }
        }, {author: "None", likes: 0})
    
    return author


}

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

console.log(getMostLikedAuthor(blogs))

module.exports = {dummy, totalLike, getMostLikedAuthor, getMostPopularAuthor}