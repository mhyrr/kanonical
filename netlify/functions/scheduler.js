import fetch from 'node-fetch'
import { schedule } from '@netlify/functions'

// This is a sample build hook URL
const BUILD_HOOK =
  'https://api.netlify.com/build_hooks/637648f0edb37f1794aaf566'

// Schedules the handler function to run at midnight on
// Mondays, Wednesday, and Friday
const handler = schedule('0 6 * * *', async () => {
  await fetch(BUILD_HOOK, {
    method: 'POST'
  }).then(response => {
    console.log('Build hook response:', response)
  })

  return {
    statusCode: 200
  }
})

export { handler }
