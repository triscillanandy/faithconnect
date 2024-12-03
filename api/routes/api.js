
import cors from 'cors';

dotenv.config();


app.use(cors());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});


