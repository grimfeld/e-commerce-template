import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse<unknown>>({
  onError: (error, req, res) => {
    res.status(500).send(error.message)
  },
  onNoMatch: (req, res) => {
    res.status(405).json('Method not allowed')
  }
})

export default handler