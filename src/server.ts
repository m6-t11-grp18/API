// import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import App from './App';
import { IEmailRequest } from './interfaces';
import { sendEmail } from './utils/nodemailer';
import { v4 as uuid } from 'uuid';
import prismaConnect from './utils/dataBaseClient';

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



App.post('/email', async (req: Request, res: Response) => {
  try {
    //Aqui pegamos o assunto, texto e o email do destinatário vindos do body da requisição
    //subject -> assunto
    //text -> texto
    //email -> email do destinatário

    const newṔassword = `${uuid()}`

    const {id} = req.user

    const updateUser = await prismaConnect.users.update({
      where: {
        id,
      },
      data: {
        password: newṔassword ,
      },
    });

    const { to }: IEmailRequest = req.body;
    const subject = 'Recovery: Here your new password';
    const text = `Your new password: ${newṔassword}`

    //Chamamos a função que fará o envio do email, passando os dados recebidos
    await sendEmail({subject, text, to });
    return res.json({
      message: 'Email sended with success!',
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
});

App.listen(3333, () =>
  console.log('Server is running on PORT 3333')
);

module.exports;
