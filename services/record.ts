import {Request, Response, NextFunction} from 'express'
import boom from 'boom'
const {body, validationResult} = require('express-validator')
import commonRes from '../utils/commonRes'
import {dbCreate, dbDelete, dbRead, dbUpdate} from '../utils/db'
import {Table} from './index'

// 打卡记录数据列表
export const getList = async (req: Request, res: Response) => {
  try {
    const list = await dbRead({table: Table.record})
    commonRes(res, list)
  } catch {
    commonRes.error(res, {message: '查询失败'})
  }
}
// 获取某一打卡记录详情
export const getOne = async (req: Request, res: Response) => {
  try {
    const list = await dbRead({table: Table.record, params: {id: req.params?.id}})
    commonRes(res, list?.[0])
  } catch {
    commonRes.error(res, {message: '查询失败'})
  }
}

// 新增打卡记录
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const err = validationResult(req)
    if (err.isEmpty()) {
      await dbCreate({table: Table.record, params: req.body})
      commonRes(res, '打卡成功')
    } else {
      const [{msg}] = err.errors
      next(boom.badRequest(msg)) // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    }
  } catch {
    commonRes.error(res, {message: '打卡失败'})
  }
}

// 更新某一打卡记录
export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const err = validationResult(req)
    if (err.isEmpty()) {
      const data = req.body
      delete data.id // 不可有 id
      await dbUpdate({table: Table.record, id: req.params?.id, params: data})
      commonRes(res, '更新数据成功')
    } else {
      const [{msg}] = err.errors
      next(boom.badRequest(msg)) // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    }
  } catch {
    commonRes.error(res, {message: '更新数据失败'})
  }
}

// 删除某一打卡记录
export const remove = async (req: Request, res: Response) => {
  try {
    await dbDelete({table: Table.record, id: req.params?.id})
    commonRes(res, '取消成功')
  } catch {
    commonRes.error(res, {message: '取消失败'})
  }
}

export const createValidator = [
  body('dimension').notEmpty().withMessage('请选择类别'),
  body('createTime').notEmpty().withMessage('请选择时间'),
  body('duration').notEmpty().withMessage('请选择时长')
]

export const updateValidator = []
