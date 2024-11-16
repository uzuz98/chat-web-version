import axios from "axios"

const apiToken = axios.create({
  baseURL: 'https://superwallet-chat-api.coin98.tech/',
  headers: {
    deviceid: 'B57F9673-441E-41BA-8160-102212137A3D'
  }
})

export const POST = async (req: Request) => {
  const payload = await req.json()

  const { oneIdName, signature } = payload

  if (!oneIdName || !signature) {
    return Response.json({
      result: 'error',
      message: 'Invalid payload'
    }, {
      status: 400
    })
  }
  const response = await apiToken.get('auth/token', {
    headers: {
      oneid: oneIdName,
      onchainsignature: signature,
    }
  })

  return Response.json(response.data.data, {
    status: 200
  })
}