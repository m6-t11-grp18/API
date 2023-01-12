import 'dotenv/config';

export function htmlBody(
  message: string,
  reset: boolean = false
) {
  let link = process.env.BASE_URL;

  if (reset === true) {
    link = process.env.BASE_RESET;
  }

  const email = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
  <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
       <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Confirm Account KenzieLover!</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       </head>
       <body style="margin: 0; padding: 0; ">
            <!-- HEADER -->
            <table bgcolor="#FDFDFD" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                 <tr>
                      <td align="center" height="200">
                           <img src="https://res.cloudinary.com/dtgkjo5sy/image/upload/v1673531765/motorshop/Email/Logo_j94lh4.png" alt="Kenzie Love" style="display: block; margin: 0 10%;  width: 80%;" />
                      </td>
                 </tr>
                 <!-- MAIN BODY -->
                 <tr>
                      <td bgcolor="#FDFDFD" style="padding: 2em;">
                           <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <hr>
                                <tr>
                                     <td align="center" style=" font-weight: 600; color: #000000; font-family: Arial, sans-serif; font-size: 1.5em; padding-top: 2em;">
                                          Anote sua nova senha: ${message}
                                     </td>
                                </tr>
                                <tr>
                                     <td>
                                          <img src="https://res.cloudinary.com/dtgkjo5sy/image/upload/v1673532235/motorshop/Email/istockphoto-1254555110-170667a_ygmvwh.jpg" alt="" width="60%" style="display: block;" />
                                     </td>
                                </tr>
                                <!-- RODAPE -->
                                <tr>
                                     <td align="bottom" bgcolor="#ffffff" style="padding: 2em 2em 0;">
                                          <hr>
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                               <tr>
                                                    <td style="color: #000000; font-family: Arial, sans-serif; font-size: 1rem;">
                                                         &reg; MotorShop, 2023<br />
                                                         <a href="#" style="color: #000000;">
                                                              <font color="#000000">
                                                                   Unsubscibre</font>
                                                         </a>to this e-mail
                                                    </td>
                                               </tr>
                                          </table>
                                     </td>
                                </tr>
                           </table>
       </body>
  </html>;`;

  return email;
}
