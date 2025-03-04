// export async function GET() {
//   const code = "AQAS7QVZyqob7GwrXnAK0z90BtHLCLnl0ccwhoy9sL_61-34SV9zsWLGYPeUUnF3Yxp69adPon72HL6DQQdGFwoLV3MfIh8RQlX3eLkzaElg1OW22Z2xWXndzkMTx5fFtebWP6mK7Wfo8kGL9UUF5J9SLj8Lyqb2xR4Gj2jsvRPCikV7bkv3_NEwq91AjEkfjp6lcA"
//   const CLIENT_ID = "be8f2a80eef149b095e1a606f9056080"
//   const CLIENT_SECRET = "695acbb2dd2d4bd386f1f72931cb1c4e"
//   const REDIRECT_URI = "http://127.0.0.1:3000"  
//   const response = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Authorization": "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`) 
//     },
//     body: new URLSearchParams({
//       grant_type: "authorization_code",
//       code: code,
//       redirect_uri: REDIRECT_URI
//     })      
//   })
//   const data = await response.json()
//   console.log(data);
  
//   return new Response(JSON.stringify(data))
// }
import { CLIENT_ID, CLIENT_SECRET } from "../constants.js"

export async function refreshToken(token) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: token
    })
  })

  const data = await response.json()
  return data.access_token
}

export async function getLastPlayedSong(token) {
  const url = "https://api.spotify.com/v1/me/player/recently-played?limit=1"
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
  const data = await response.json()
  
  return new Response(JSON.stringify({
    name: data.items[0].track.name,
    artist: data.items[0].track.artists[0].name,
    image: data.items[0].track.album.images[0].url
  }))
}