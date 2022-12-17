import {Router} from 'express'
import {getList, getOne, create, update, remove, createValidator, updateValidator} from '../services/record'

const router = Router()

// 打卡记录数据列表
router.get('/', getList)

// 获取某一打卡记录详情
router.get('/:id', getOne)

// 新增打卡记录
router.post('/', createValidator, create)

// 更新某一打卡记录
router.put('/:id', updateValidator, update)

// 删除某一打卡记录
router.delete('/:id', remove)

export default router
