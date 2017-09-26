// API and packages
const path    = require('path')
const JiraApi = require('jira-client')
const yaml    = require('yamljs')
const args    = require('minimist')(process.argv.slice(2), {
  string: ['sprint'],
  alias: { sprint: 's' }
})

// jira lib
const genJqlString = require('./lib/genJqlString')
const reportTasks = require('./lib/reportTasks')
const {
  getComments,
  searchQuery
}  = require('./lib/requestJira')
const sprint       = args.sprint.indexOf(',') >= 0
  ? args.sprint.split(',')
  : args.sprint

// configure and jira query
/** config.yml から読み込む設定オブジェクト */
const setting = yaml.load(path.join(__dirname + '/config.yml'))
/** Emailをキーとした個人名マッピングオブジェクト */
const emailMap = yaml.load(path.join(__dirname + '/emailMapping.yml'))
/** jql 文字列生成 */
const jql = genJqlString(Object.assign({}, setting.jiraQuery, {
  Sprint: sprint
}))
/** jira-client instance */
const jira = new JiraApi(setting.config)
const tasks = []
console.log(`run JQL: ${jql}`) // jql 出力

// asynchronous request 
;(async ()=> {
  const result = await searchQuery(jira, jql)
  result.issues.map( issue =>{
    const title    = issue.fields.summary
    const assignee = emailMap[issue.fields.assignee.emailAddress]
    const status   = issue.fields.status.name
    const statusId = issue.fields.status.id
    const issueKey = issue.key
    tasks.push({ title, assignee, statusId, status, issueKey })
  })
  const asyncComments = tasks.map( async (task) => {
    return await getComments(jira, task.issueKey)
  })
  for (let i = 0; i < asyncComments.length; i++) {
    const { comments } = await asyncComments[i]
    if (comments.length > 0) {
      tasks[i].comment = comments.pop().body
    } else {
      tasks[i].comment = '特記事項なし'
    }
  }
  reportTasks(setting.project, tasks)
})()
