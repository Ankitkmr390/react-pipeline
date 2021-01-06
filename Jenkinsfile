pipeline {
    /* insert Declarative Pipeline here */

    agent none
    environment{
        CI = 'true'
    }
    stages{
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }        
    }
}