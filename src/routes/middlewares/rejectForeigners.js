import { config as dotenv } from 'dotenv'
dotenv()

const rapidAPIKey = process.env.X_RAPIDAPI_PROXY_SECRET

const isFromRapidAPI = (req) => {
  return (
    !!req.headers["x-rapidapi-proxy-secret"] &&
    req.headers["x-rapidapi-proxy-secret"] === rapidAPIKey
  )
}

// const isBanned = (req) => {
//   const bannedIPs = ["103.152.158.50"]
//   return bannedIPs.includes(req.ip.split(":").pop())
// }


const rejectForeignRequests = (req, reply, done) => {
  // if (isBanned(req)) {
  //   return reply.status(403).send("You've been banned forever from this API.")
  // }

  if (process.env.NODE_ENV === 'localhost' || isFromRapidAPI(req)) {
    done()
    return
  } else {
    reply.status(403).send("You don't have access here.")
    return
  }
}


export default rejectForeignRequests
