import {Response} from 'express'
import logger from '../utils/logger'

// 内部使用的返回状态标识
enum StatusCode {
  success = 3000,
  denied,
  error
}
enum StatusCodeMessage {
  success = '请求成功',
  denied = '无权限',
  error = '系统异常'
}

type codeType = keyof typeof StatusCode

export {StatusCode, StatusCodeMessage, codeType}

interface ResOption {
  type?: codeType // 状态类型
  code?: number // 状态码
  message?: unknown // 返回信息
}

// 默认成功响应
function commonRes(res: Response, data: unknown, options?: ResOption) {
  const _options = Object.assign({type: StatusCode[3000], message: StatusCodeMessage['success']}, options || {})
  const {type, code, message} = _options
  // 根据内部返回码设置响应状态码
  const statusCode = code ? code : type === StatusCode[3000] ? 200 : 500
  return res.status(statusCode).send({
    code: StatusCode[type as codeType],
    data,
    message
  })
}

// 错误响应
commonRes.error = function (res: Response, options?: ResOption) {
  const {message, code} = options || {}
  logger.error(message || StatusCodeMessage['error'])
  this(res, null, {
    type: 'error',
    message: message || StatusCodeMessage['error'],
    code: code || 500
  })
}

// 无权限响应
commonRes.denied = function (res: Response, data: unknown) {
  this(res, data, {
    type: 'denied',
    message: StatusCodeMessage['denied'],
    code: 401
  })
}

export default commonRes
