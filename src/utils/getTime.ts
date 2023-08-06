export const getTime = () => {
  const hour = new Date().getHours()
  let time = ''
  if (hour >= 6 && hour <= 9) {
    time = '早上'
  } else if (hour > 9 && hour < 11) {
    time = '上午'
  } else if (hour >= 11 && hour < 13) {
    time = '中午'
  } else if (hour >= 13 && hour < 6) {
    time = '下午'
  } else {
    time = '晚上'
  }
  return time
}
