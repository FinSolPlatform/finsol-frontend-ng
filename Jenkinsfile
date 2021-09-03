pipeline {
    options {
        // set a timeout of 60 minutes for this pipeline
        timeout(time: 60, unit: 'MINUTES')
    }
    agent {
        node {
            label 'nodejs'
        }
    }
    environment {
        APP_GIT_URL = "https://github.com/FinSolPlatform/finsol-gitops.git"
        
        DEV_PROJECT = "lhqcqt-finsol-platform-dev"
        STAGE_PROJECT = "lhqcqt-finsol-platform-stage"
        PROD_PROJECT = "lhqcqt-finsol-platform-prod"
        
        APP_NAME = "frontend-ng"
    }
    stages {
        stage('NPM Install') {
            steps {
                echo '### Installing NPM dependencies ###'
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo '### Running unit tests ###'
                sh 'ng test --watch=false'
            }
        }

        stage('Run Linting Tools') {
            steps {
                echo '### Running eslint on code ###'
                sh 'npm run lint'
            }
        }

        stage('Launch new app in DEV env') {
            steps {
                echo '### Cleaning existing resources in DEV env ###'
                sh '''
                        oc project ${DEV_PROJECT}
                        oc delete all -l app=${APP_NAME}
                        sleep 5
                   '''

                echo '### Creating a new app in DEV env ###'
                sh '''
                        oc project ${DEV_PROJECT}
                        oc new-app  --as-deployment-config --name ${APP_NAME} nodejs:12~${APP_GIT_URL}
                        oc expose svc/${APP_NAME}
                   '''
            }
        }

        stage('Wait for S2I build to complete') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject( "${DEV_PROJECT}" ) {
                            def bc = openshift.selector("bc", "${APP_NAME}")
                            bc.logs('-f')
                            def builds = bc.related('builds')
                            builds.untilEach(1) {
                                return (it.object().status.phase == "Complete")
                            }
                        }
                    }
                }
            }
        }

        stage('Wait for deployment in DEV env') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject( "${DEV_PROJECT}" ) {
                            def deployment = openshift.selector("dc", "${APP_NAME}").rollout()
                            openshift.selector("dc", "${APP_NAME}").related('pods').untilEach(1) {
                                return (it.object().status.phase == "Running")
                            }
                        }
                    }
                }
            }
        }
    }
}