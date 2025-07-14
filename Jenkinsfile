@Library("teckdigital") _
def appName = "h4hn-cms"
def gitopsRepo = "https://github.com/ItsZiroy/gitops"
def localBranchToGitopsValuesPath = [
    'main': 'apps/h4hn/cms/values.yaml',
]

pipeline {
   agent {
    kubernetes {
        inheritFrom "kaniko-template"
    }
  }
    
    stages {
        stage('Build and Tag Image') {
            steps {
                container('kaniko') {
                    script {
                        withCredentials([
                            string(credentialsId: 'teckdigital-service-user-token', variable: 'SERVICE_USER_TOKEN')
                        ]) {
                            buildDockerImage(buildArgs: ["GITHUB_AUTH_TOKEN=${SERVICE_USER_TOKEN}"])
                        }
                    }
                }
            }
        }

        stage('Update GitOps') {
            when {
                expression {
                    return localBranchToGitopsValuesPath.containsKey(getLocalBranchName())
                }
            }
            steps {
                script {
                    def valuesPath = localBranchToGitopsValuesPath[getLocalBranchName()]

                    updateGitops(appName: appName, valuesPath: valuesPath, gitopRepo: gitopsRepo, credentialsId: "itsziroy-github-user" , gitUserEmail: "yannik@h4hn.de")
                }
            }
        }
    }
}
