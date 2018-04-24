const cp = require('child_process')
/**
 * report tasks{array} strings and copy string to clipboard
 * [${obj.assignee}] = assign
 * 
 * @param {string} projectName 
 * @param {array} tasks 
 */
function reportTasks (projectName, tasks) {
  let string = `## ${projectName}\n\n`
  tasks.map( obj => {
    string += `- ${obj.title} ステータス【${obj.status}】\n  - https://asuraandroid.atlassian.net/browse/${obj.issueKey}\n`
    // ${obj.statusId != '10001' ? '備考：' + obj.comment : ''}
  })
  console.log(string)
  const child = cp.spawn('pbcopy')
  child.stdin.write(string)
  child.stdin.end()
}

module.exports = reportTasks
