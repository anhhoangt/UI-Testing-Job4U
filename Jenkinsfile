pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'  // Configure this in Jenkins Global Tool Configuration
    }

    environment {
        CI = 'true'
        PLAYWRIGHT_BROWSERS_PATH = '0'  // Use default browser path
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Branch: ${env.GIT_BRANCH}"
                echo "Commit: ${env.GIT_COMMIT}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps chromium'
                // Uncomment below to install all browsers
                // sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run test:ci'
            }
            post {
                always {
                    // Archive test results
                    publishHTML(target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright HTML Report'
                    ])

                    // Archive JUnit test results for Jenkins Test Results Analyzer
                    junit(
                        testResults: 'test-results/junit-results.xml',
                        allowEmptyResults: true
                    )
                }
            }
        }
    }

    post {
        always {
            // Clean workspace
            cleanWs(
                cleanWhenNotBuilt: false,
                deleteDirs: true,
                disableDeferredWipeout: true,
                notFailBuild: true,
                patterns: [
                    [pattern: 'node_modules/**', type: 'EXCLUDE'],
                    [pattern: 'test-results/**', type: 'INCLUDE'],
                    [pattern: 'playwright-report/**', type: 'INCLUDE']
                ]
            )
        }
        success {
            echo '✅ All tests passed!'
            // Uncomment to add Slack notification
            // slackSend(color: 'good', message: "✅ Tests passed: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        failure {
            echo '❌ Tests failed!'
            // Uncomment to add Slack notification
            // slackSend(color: 'danger', message: "❌ Tests failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        unstable {
            echo '⚠️ Tests are unstable!'
        }
    }
}
