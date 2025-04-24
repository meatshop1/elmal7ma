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
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        waitForQualityGate abortPipeline: true
                    }
                    
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

        stage('Trivy Vulnerability Scanning') {
            steps {
                script {
                    echo 'trivy scanning...'
                    sh '''
                        
                        trivy image eladwy/frontend:$GIT_COMMIT \
                            --severity LOW,MEDIUM \
                            --exit-code 0 \
                            --quiet \
                            --format json -o trivy-success.json
                        
                    
                        trivy image eladwy/frontend:$GIT_COMMIT \
                            --severity HIGH,CRITICAL \
                            --exit-code 1 \
                            --quiet \
                            --format json -o trivy-fail.json
                    '''
                }
            }
        }

        stage('Push Docker Image'){
            steps{
                    withDockerRegistry(credentialsId: 'docker-hub', url: "https://index.docker.io/v1/") {
                        echo 'pushing docker image...'
                        sh '''
                            docker push eladwy/frontend:$GIT_COMMIT
                        '''
                    }
                }
            } 
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'dependency-check-report.*', allowEmptyArchive: true
        }
    }
