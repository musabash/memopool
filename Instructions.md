1. İki klasör oluştur
  Client ve Server
2. Client klasörü içinde "npx create-react-app ./" komutunu çalıştır.
3. Server klasörü içinde index.js dosyasını oluştur.
4. Server klasörü içinde iken "npm init -y" komutunu çalıştır.
5. Server klasörü içinde iken "npm install cors express nodemon mongoose" komutunu çalıştır.
cors: cross-origin resource sharing
6. Node.js ile çalışırken import komutunu kullanabilmek için package.json dosyasını aç ve şu satırı ekle:
"type": "module"
7. package.json dosyasında script kısmına şu satırı ekle:
"start": "nodemon index.js"
8. index.js dosyasını aç ve şu importları yap:
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
9. Client klasörüne geç ve şunları yükle:
"npm install axios moment react-file-base64 redux redux-thunk"
moment: for time and date
react-file-base64: convert images
redux-thunk: for async actions
10. Client klasörü içinde src klasörünü tamamen temizle ve şu iki dosyayı oluştur:
index.js
App.js
11. index.js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
12. App.js
import React from 'react';

const App = () => {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  )
}

export default App
13. server klasörüne geç ve index.js dosyası içine aşağıdaki satırları ekle:
const app = express();//initialize app
app.use(express.json({limit: "30mb", extended: true}));//post edilecek resim dosyaları için boyut sınırlaması yapıyoruz
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
14. mongodb'de hesap oluşturuyoruz.
start free > free account > build a cluster > shared cluster > database access > new database user > set password > network access > add current ip address > clusters > connect > connect your application > copy connection string
15. server klasöründe index.js dosyasını aç ve şu satırları ekle:

const CONNECTION_URL = "mongodb+srv://<username>:<password>@cluster0.abre1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//database user için tanımladığın username ve passwordu ekle
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>app.listen(PORT, console.log("port:", PORT)));
16. npm run start komutunu çalıştır ve console'a portu yazdırıp yazdırmadığına bak.
17. server klasörü içinde routes klasörü oluştur
18. routes klasörü içinde posts.js adlı bir dosya oluştur.
19. server klasörü içinde controllers klasörü oluştur. Bu klasör içinde posts.js dosyası oluştur. Bu klasör de http requestleri için gereken fonksiyonları saklayacağız böylece routes klasörü içindeki route'lar şişmeyecek.
20. controllers klasörü içindeki posts.js dosyasına şu satırları ekle:
export const getPosts = (req, res) => {
  res.send('This works for now.');
};
21. routes klasörü içindeki posts.js dosyasına aşağıdaki satırları ekle:
import express from 'express';
import { getPosts } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);

export default router
dosyayı kaydet 
22. server klasörü içindeki index.js dosyasını aç ve şu satırları uygun yerlere ekle:

import postRoutes from './routes/posts.js'

app.use('/posts', postRoutes)
23. http://localhost:5000/posts adresini tarayıcında açıp "This works for now" yazısını gör.
24. server klasöründe models klasörü oluştur ve models klasörü içinde postMessage.js dosyası oluştur.
25. postMessage.js
import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
})

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;

26.routes klasörü içindeki posts.js dosyasına yeni satır ekle:
router.post('/', createPost);
createPost function'ını import et.
27. Controllers klasörü içindeki posts.js dosyasına aşağıdaki satırları ekle:
export const createPosts = (req, res) => {
  res.send('Post Creation');
};
PostMessage'ı import et: import PostMessage from "../models/postMessage.js";

28.posts.js dosyasında aşağıdaki değişikliği yapıp kaydedince localhost:5000'e boş array görmelisin.
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()
    console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({message: error.message})
  }
};

29. export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

30. client klasörüne geçip get ve post metodlarını kullanabilmek için bir arayüz oluşturuyoruz.
npm install  @material-ui/core
31. src klasörü altında components klasörü oluştur.
components klasörü içinde yeni iki klasör oluştur:
Form ve Posts
Posts klasörü içinde Posts.js, styles.js dosyası oluştur.
Form klasörü içinde Form.js, styles.js dosyası oluştur.
Posts klasörü içinde Post klasörü oluştur ve Post klasörü içinde Post.js ve styles.js dosyaları oluştur.
32. App.js
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
33. App.js
const App = () => {
  return (
    <Container maxwidth="lg">
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">
          Memories
        </Typography>
        <img src={memories} alt="memories" height="60" />
      </AppBar>

    </Container>
  )
}

export default App

34. src klasörü içinde 

35. Redux: Uygulamanın bütün state management'ı bunun üzerinden olur.
index.js içinde createStore() kullanarak store objecti tanımlanır. createStore argüman olarak reducer alır. Ayrıca asenkron işlemler için compose(applyMiddleware(thunk)) argümanını da ekliyoruz. Bunları kullanabilmek için şunları import etmek lazım:
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'
Ayrıca tüm bileşenlerin state'e erişebilmesi için index.js içinde react-redux'tan import edilen provider ile wrap yapıyoruz tüm bileşenleri.
import { Provider } from 'react-redux';
