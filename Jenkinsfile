pipeline {
    /* insert Declarative Pipeline here */

    agent any
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