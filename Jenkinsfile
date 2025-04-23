pipeline{
    agent any
    stages{
        stage('installing...'){
            steps{
                script {
                    echo 'installing ...'
                    sh '''
                        npm install --no-audit 
                    '''
                }
            }
        }
        stage('Dependency Check'){
            steps{
                script {
                    echo 'checking dependencies...'
                    sh '''
                        npm audit --audit-level=critical 
                    '''
                }
            }
        }
        stage('owasp dependency check'){
            steps{
                dependencyCheck additionalArguments: '''
                    --scan ./ 
                    --out ./ 
                    --format ALL 
                    --prettyPrint
                    --skip-nvd-update
                ''', odcInstallation: 'owasp-10'
            }
        }
    }
    post {
        always {
            // Archive the dependency check reports as artifacts
            archiveArtifacts artifacts: 'dependency-check-report.*', allowEmptyArchive: true
        }
    }
}
