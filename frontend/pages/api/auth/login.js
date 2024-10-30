// import axios from "axios";
//
// export default async (req, res) => {
//
//   if (req.method === 'POST') {
//
//     const { email, password } = req.body;
//     try {
//       const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({email, password})
//       })
//       const data = await response.json()
//       res.status(200).json(data)
//     } catch (error) {
//       res.status(500).json({ error: error.message })
//     }
//   }
//
// }


import axios from 'axios';
import cookie from 'cookie';

export default async (req, res) => {
  if (req.method === 'POST') {
    const {username, password} = req.body;

    try {
      const response = await axios.post(`${process.env.API_URL}/api/token/`, {
        username,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.access) {

        res.setHeader('Set-Cookie', [
          cookie.serialize('access', response.data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'strict',
            path: '/'
          }),
          // cookie.serialize('refresh', response.data.refresh, {
          //   httpOnly: true,
          //   secure: process.env.NODE_ENV !== 'development',
          //   maxAge: 60 * 60 * 24 * 7, // 1 week
          //   sameSite: 'strict',
          //   path: '/'
          // })
        ]);

        res.status(200).json({
          success: true,
        });

      } else {
        res.status(response.status).json({
          error: "Authentication failed."
        });
      }

    } catch (error) {
      res.status(error.response.status).json({error: error.response && error.response.data.error});
    }
  }
};