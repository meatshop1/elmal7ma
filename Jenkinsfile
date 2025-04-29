pipeline{
    agent any
    environment {
        SONAR_SCANNER_HOME = tool 'sonarqube-scanner';
        GITHUB_TOKEN = credentials('git_hub_token');   
    }
    stages{
        stage('installing...'){
            steps{
                script {
                    echo 'installing ....'
                    sh '''
                        npm install 
                    '''
                }
            }
        }
        // stage('Dependency Scanning'){
        //     parallel {
        //         stage('Dependency Check'){
        //             steps{
        //                 script {
        //                     echo 'checking dependencies...'
        //                     sh '''
        //                         npm audit --audit-level=critical
        //                     '''
        //                 }
        //             }
        //         }      
        //         stage('owasp dependency check'){
        //             steps{
        //                 dependencyCheck additionalArguments: '''
        //                     --scan ./
        //                     --out ./
        //                     --format ALL
        //                     --prettyPrint
        //                     --disableYarnAudit \
        //                     --noupdate
        //                 ''', odcInstallation: 'owasp-10'
        //                 dependencyCheckPublisher pattern: 'dependency-check-report.xml', stopBuild: true, unstableTotalCritical: 1, unstableTotalHigh: 5, unstableTotalMedium: 11
        //                 publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: './', reportFiles: 'dependency-check-report.html', reportName: 'dependency check HTML Report', reportTitles: '', useWrapperFileDirectly: true])
        //             }
        //         }
        //     }
        // }
       stage('SAST - SonarQube') {
            steps {
                timeout(time: 120, unit: 'SECONDS') {
                    withSonarQubeEnv('SonarQube') {
                        sh '''
                            $SONAR_SCANNER_HOME/bin/sonar-scanner \
                               -Dsonar.projectKey=meatshop \
                               -Dsonar.projectName=meatshop \
                               -Dsonar.sources=./src \
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

        stage('Trivy Vulnarability Scanner'){
            steps {
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
            post {
                always {
                    sh '''
                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                            --output trivy-image-MEDIUM-results.html trivy-success.json

                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                            --output trivy-image-CRITICAL-results.html trivy-fail.json

                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/junit.tpl" \
                            --output trivy-image-MEDIUM-results.xml trivy-success.json

                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/junit.tpl" \
                            --output trivy-image-CRITICAL-results.xml trivy-fail.json
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

        stage('Deploy to aws'){
            when{
                branch 'features'
            }
            steps{
                script{
                        sshagent(['aws-dev-deploy']){
                            sh '''
                                ssh -o StrictHostKeyChecking=no ubuntu@ec2-157-175-219-194.me-south-1.compute.amazonaws.com "
                                    if sudo docker ps -a | grep -q "frontend"; then
                                        echo "Container exists, stopping and removing..."
                                        sudo docker stop frontend
                                        sudo docker rm frontend
                                        echo "Container stopped and removed."
                                    fi
                                    echo "Running new container..."
                                    sudo docker run -d --name frontend -p 80:80 eladwy/frontend:$GIT_COMMIT
                                    "
                            '''
                    }
                }
            }
        }

        stage('Integration Testing'){
            when{
                branch 'features'
            }
            steps{
                withAWS(credentials: 'aws', region: 'me-south-1') {
                    echo 'running integration tests...'
                    sh '''
                       bash integration-test.sh
                    '''
                }
            }
        }
        stage('K8S update image tag'){
            when{
                branch 'PR*'
            }
            steps{
                script {
                    echo 'updating image tag in k8s...'
                    sh'git clone -b main https://github.com/abdelrahman-eladwy/meatshop-k8s.git'
                    dir ('meatshop-k8s'){
                        sh '''
                            ###Get the build id###
                            echo "123"
                            git checkout main
                            git checkout -b feature$BUILD_ID
                            sed -i "s|eladwy/frontend:.*|eladwy/frontend:$GIT_COMMIT|g" /frontend/deployment.yaml
                            cat /frontend/deployment.yaml


                            ###Commit and push to feature branch###
                            git config --global user.email "abdoahmed32522@gmail.com"
                            git remote set-url origin https://$GITHUB_TOKEN@github.com/abdelrahman-eladwy/meatshop-k8s.git
                            git add .
                            git commit -m "updating image tag to $GIT_COMMIT"
                            git push -u origin feature$BUILD_ID
                        '''
                    }
                }
            }
        }
            
    }
    post {
        always {
            script {
                if (fileExists('meatshop-k8s')) {
                    sh ' rm -rf meatshop-k8s'
                    
                }
            }
            archiveArtifacts artifacts: 'dependency-check-report.*', allowEmptyArchive: true
        }
    }
}