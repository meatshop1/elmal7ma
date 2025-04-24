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
                            --disableYarnAudit \
                            --noupdate
                        ''', odcInstallation: 'owasp-10'
                        dependencyCheckPublisher pattern: 'dependency-check-report.xml', stopBuild: true, unstableTotalCritical: 1, unstableTotalHigh: 5, unstableTotalMedium: 11
                        publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: './', reportFiles: 'dependency-check-report.html', reportName: 'dependency check HTML Report', reportTitles: '', useWrapperFileDirectly: true])
                    }
                }
            }
        }
        stage('SAST - SonarQube'){
            steps{
                timeout(time: 60, unit: 'SECONDS') {
                    withSonarQubeEnv('SonarQube') {
                        sh '''
                            ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                            -Dsonar.projectKey=meatshop \
                            -Dsonar.projectName=meatshop \
                            -Dsonar.sources=./src \
                            -Dsonar.js.node.path=$(which node)
                        '''
                    }
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Building Docke Image'){
            steps{
                script {
                    echo 'building docker image...'
                    sh '''
                        docker build -t eladwy/frontend:$GIT_COMMIT .
                    '''
                }
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'dependency-check-report.*', allowEmptyArchive: true
        }
    }
}