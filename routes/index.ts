import express, {Request, NextFunction, Response} from 'express'
import commonRes from '../utils/commonRes'
import recordRouter from './record'
import logger from '../utils/logger'

const router = express.Router()

router.use('/record', recordRouter)

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const {output} = err || {}
  logger.error(output)
  // 错误码和错误信息
  const errCode = (output && output.statusCode) || 500
  const errMsg = (output && output.payload && output.payload.message) || err.message
  logger.error(errMsg)
  commonRes.error(res, {
    code: errCode,
    message: errMsg
  })
})

export default router
