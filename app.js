const express = require('express');
const hbs = require('hbs');
const multer = require('multer');
const folder = require('./folder');
const activeMenu = require('./activeMenu')

const app = express();
const upload = multer({dest:'files'})
const storageConfig = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"files")
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})

app.set('view engine','hbs');
hbs.registerPartials(__dirname + "/views/partial")

app.use(express.static(__dirname))
app.use(multer({storage:storageConfig}).single("filedata"))

app.get('/', function (request,response) {
   //let active = activeMenu.setActive();
    let links = folder.getFiles('./files/')
    response.render('index',{
        title:"Главная страница",
        description:"Вывод хранимых файлов",
        links: links
    });
})
app.get('/upload', function (request,response) {
    response.render('upload',{
        title: "Загрузка файлов",
        buttonName:"Загрузить"
    });
})
app.post('/upload',upload.single('filedata'), function (request,response,next) {
    let filedata = request.file;
    if (!filedata) response.send("Ошибка при загрузке файла")
    else  response.render('upload',{
        title: "Загрузка файлов",
        buttonName:"Загрузить"
    });

})
app.listen(3000, function () {
    console.log('Сервер запущен по порту 3000');
})