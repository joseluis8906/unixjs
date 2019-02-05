pipeline {
  agent {
    docker {
      image "node:8.12.0-stretch"
      args "--name unixjs --network restaurantetic -p 3000:3000 "
    }
  }
  stages {
    stage ("Build") {
      steps {
        sh "npm install"
      }
    }
    stage ("Run") {
      steps {
        sh "npm run serve"
        input message: "Finished using the web site? (Click \"Proceed\" to continue)"
      }
    }
  }
}