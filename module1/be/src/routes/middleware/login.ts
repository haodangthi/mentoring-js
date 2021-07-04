import jwt from 'jsonwebtoken'
import * as auth from '../../secret/auth.json'

export const authHeader = (req, res, next) => {
  const [ token_type, jwt_token ] = req.headers['authorization']?.split(' ')
  const secret = auth.secret
  const user = jwt.verify(jwt_token, secret)
  req.user = user

  next()
}
