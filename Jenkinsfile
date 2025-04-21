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
                ''', odcInstallation: 'owasp-10'

        }
    }
 }
}
