const express = require ('express');
const cors = require('cors');
const rootRouter = require('../backend/routes/index'); // this were me used router


const PORT = 3000;      

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1",rootRouter); // this were me used router


app.listen(PORT,()=>{
    console.log('Server is running at 3000');
})