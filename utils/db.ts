import mysql from 'mysql2'
import logger from './logger'
import connectionConfig from '../config/mysql.config'

interface ISqlParams {
  [prop: string]: any
}

// 读取数据
export const dbRead = ({table = '', params}: {table: String; params?: ISqlParams}): Promise<any> => {
  const sql = `SELECT * FROM ${table} ${getQueryParamSql(params)}`
  return dbQuery(sql)
}

// 新增数据
export const dbCreate = ({table = '', params}: {table: String; params: ISqlParams}): Promise<any> => {
  const sql = `INSERT INTO ${table} ${getCreateParamSql(params)}`
  return dbQuery(sql)
}

// 更新数据
export const dbUpdate = ({table = '', id, params}: {table: String; id: string; params: ISqlParams}): Promise<any> => {
  const sql = `UPDATE ${table} SET ${getUpdateParamSql(params)} WHERE id=${id}`
  console.log(sql)
  return dbQuery(sql)
}

// 删除数据
export const dbDelete = ({table = '', id}: {table: String; id: string}): Promise<any> => {
  const sql = `UPDATE ${table} SET isDelete=1 WHERE id=${id}`
  return dbQuery(sql)
}

// 操作数据库
export const dbQuery = (sql: string): Promise<any> => {
  const dbConn = mysql.createConnection(connectionConfig)
  return new Promise((resolve, reject) => {
    try {
      dbConn.query(sql, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    } catch (e) {
      logger.error('Could not connect to db or query the data')
      reject(e)
    } finally {
      dbConn.end()
    }
  })
}

const getQueryParamSql = (params?: ISqlParams): string => {
  if (!params || !Object.keys(params).length) return ''
  return (
    'WHERE' +
    Object.keys(params)
      .map(key => ` ${key}="${params[key]}" `)
      .join('and')
  )
}

const getCreateParamSql = (params: ISqlParams): string => {
  if (!params || !Object.keys(params).length) return ''
  const keys = Object.keys(params)
  return `(${keys.join(',')}) VALUES (${keys.map(key => `"${params[key]}"`).join(',')})`
}

const getUpdateParamSql = (params?: ISqlParams): string => {
  if (!params || !Object.keys(params).length) return ''
  return Object.keys(params)
    .map(key => `${key}="${params[key]}"`)
    .join(',')
}
