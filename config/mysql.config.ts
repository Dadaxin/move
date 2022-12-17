const devConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'move'
}
const prodConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'move'
}
export default process.env.NODE_ENV === 'development' ? devConfig : prodConfig
