# Get Sprint Issues from JIRA REST API

## Configure

rename `config.yml.sample` to `config.yml`.  
`jiraQuery` is jql-search field.

## Mapping emails to user names

rename `emailMapping.yml.sample` to `emailMapping.yml`.

## Usage

positional arguments: sprint [alias: s], sprint id.

```bash
node . --sprint=120
```
for multiple sprints 
```bash
node . --sprint=120,121
```
