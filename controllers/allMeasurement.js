const User = require('../models/User')
const dayjs = require('dayjs')

module.exports.allMeasurement = async function allMeasurement(ctx, next) {
  const { date } = ctx.request.body
  let result = null
  // За все время
  const user = await User.findOne({ email: ctx.user.email })
  if (!date) {
    ctx.status = 200
    result = user.measurement.map(item => {
      const { temp, status, id, image } = item
      return {temp, status, id, image}
    })
  }
  // today
  if (date === 'd') {
    const now = dayjs().startOf('day')
    const tomorrow = now.add(1, 'day')
    result = period(user, now, tomorrow)
  }
  // week
  if (date === 'w') {
    let startWeek = dayjs().startOf('week').add(1,'day')
    let endWeek = startWeek.add(6, 'day').endOf('day')
    const now = dayjs().endOf('day')
    if (dayjs().get('day') === 0) {
      startWeek = dayjs().startOf('week').add(-6,'day')
      endWeek = dayjs().endOf('day')
    }
    if (now.valueOf() < endWeek.valueOf()) {
      result = period(user, startWeek, now)
    } else {
      result = period(user, startWeek, endWeek)
    }
  }
  // month
  if (date === 'm') {
    const startMonth = dayjs().startOf('month')
    const endMonth = dayjs().endOf('month')
    const now = dayjs().endOf('day')
    if (now.valueOf() < endMonth.valueOf()) {
      result = period(user, startMonth, now)
    } else {
      result = period(user, startMonth, endMonth)
    }
  }
  // yesterday
  if (date === 'y') {
    const yesterday = dayjs().startOf('day').add(-1, 'day')
    const now = yesterday.endOf('day')
    result = period(user, yesterday, now)
  }
  ctx.status = 200
  ctx.body = { data: result }
};

function period (user, date1, date2) {
  return user.measurement.map(item => {
    if (item.id >= date1.valueOf() && item.id <= date2.valueOf()) {
      const { temp, status, id, image } = item
      return {temp, status, id, image}
    } else {
      return null
    }
  }).filter(Boolean)
}