// import bodyParser from 'body-parser';
import App from './App';


// App.use(cors ())
// App.use(bodyParser.urlencoded({extended : true, limit: "100mb"}));
// App.use(bodyParser.json({limit: '100mb'}));
// App.use(express.static(path.join('build')))
// App.use(cookieParser())
// App.use(fileUpload())
// App.use(csrf({cookie: true}))

// App.use(bodyParser.json());
// App.use(bodyParser.urlencoded({ extended: true }));

// const multipartMiddleware = multipart({
//   maxFieldsSize: 20 * 1024 * 1024,
// });

// App.use(multipartMiddleware)

App.listen(3333, () =>
  console.log('Server is running on PORT 3333')
);

module.exports;
