// 响应数据的基础格式
export default interface BasicResponse {
  code: number
  data: any
  message: string
  ok: boolean
}
