let express = require('express');
let app=express();
let cors= require('cors');
let axios=require('axios')
app.use(cors());

app.get('/',(req,res)=>{
    res.send({msg:'hello'});
})

app.get('/allMovies',async (req,res)=>{
    let data = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=6bcf2d9adce5d982f98da929cf8c8eab&language=en-US&page=1');
    
    console.log(data.data);

    res.send({msg:data.data})
})



app.get('/movieData/:movieID', async (req, res) => {
    try {
      const movieID = req.params.movieID;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=6bcf2d9adce5d982f98da929cf8c8eab`
      );
      console.log(response.data);
  
      res.send({ msg: response.data });
    } catch (error) {
      console.error('Error fetching movie data:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });




app.get('/search', async (req, res) => {
    let searchIn = req.query.query || ''; 
    let data = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=6bcf2d9adce5d982f98da929cf8c8eab&language=en-US&query=${searchIn}&page=1&include_adult=false`)
    console.log(data.data);

    res.send({ msg: data.data });
});



app.listen(7000,()=>{
    console.log('listening to port 7000');
})