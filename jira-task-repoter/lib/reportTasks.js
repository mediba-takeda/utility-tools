const cp = require('child_process')
/**
 * report tasks{array} strings and copy string to clipboard
 * 
 * @param {string} projectName 
 * @param {array} tasks 
 */
function reportTasks (projectName, tasks) {
  let string = `# ${projectName}\n`
  tasks.map( obj => {
    string += `
### ${obj.title} [${obj.assignee}]
- ステータス【${obj.status}】
${obj.statusId != '10001' ? '備考：'+obj.comment+"\n" : ''}`
  })
  console.log(string)
  const child = cp.spawn('pbcopy')
  child.stdin.write(string)
  child.stdin.end()
}

module.exports = reportTasks
