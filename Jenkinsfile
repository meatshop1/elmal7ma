pipeline{
    agent any

    environment {
        SONAR_SCANNER_HOME = tool 'sonarqube-scanner';
    }
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
        stage('Dependency Scanning'){
            parallel {
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
                    --noupdate
                ''', odcInstallation: 'owasp-10'
                dependencyCheckPublisher pattern: 'dependency-check-report.xml', stopBuild: true, unstableTotalCritical: 1, unstableTotalHigh: 5, unstableTotalMedium: 11
                publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './', reportFiles: 'dependency-check-report.html', reportName: 'dependency check HTML Report', reportTitles: '', useWrapperFileDirectly: true])
                     }
                }
            }
        }

        stage('SAST - SonarQube'){
            steps{
                script {
                    sh '''
                        $SONAR_SCANNER_HOME/bin/sonar-scanner \
                            -Dsonar.projectKey=meatshop \
                            -Dsonar.sources=./src \
                            -Dsonar.host.url=http://localhost:9000 \
                            -Dsonar.token=sqp_62f0173ee7dc268629d799d866e88d6a217daaa0 \
 
                    '''
                }
            }
        }

       
        
    }
    // post {
    //     always {
    //         // Archive the dependency check reports as artifacts
    //         archiveArtifacts artifacts: 'dependency-check-report.*', allowEmptyArchive: true
    //     }
    // }
}
