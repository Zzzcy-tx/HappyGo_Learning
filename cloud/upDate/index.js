// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  db.collection(event.school)
    .doc(event.id)
    .update({
      data: {
        state: event.state,
        helpId: event.helpId,
        help_id: event.help_id,
      }
    })


}