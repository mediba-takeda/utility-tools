/**
 * request to /search endpoint with jql string
 * 
 * @param {object} jiraInstance 
 * @param {string} jql 
 * @returns {Promise.<res, err>}
 */
function searchQuery (jiraInstance, jql) {
  return new Promise((resolve, reject)=>{
    jiraInstance.searchJira(jql)
    .then( res => {
      resolve(res)
    })
    .catch( err => {
      reject(err)
      throw new Error(err)
    })
  })
}

/**
 * get comments from issue key
 * 
 * @param {object} jiraInstance 
 * @param {string} issueKey 
 * @returns {Promise.<res, err>}
 */
function getComments (jiraInstance, issueKey) {
  const jira = jiraInstance
  return new Promise((resolve, reject) => {
    jira.doRequest(jira.makeRequestHeader(jira.makeUri({
      pathname: `/issue/${issueKey}/comment`
    })))
    .then( res => {
      resolve(res)
    })
    .catch( err => {
      reject(err)
      throw new Error(err)
    })
  })
}

module.exports = { searchQuery, getComments }
