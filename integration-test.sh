#!/bin/bash

aws --version
URL=$(aws ec2 describe-instances | jq -r '.Reservations[].Instances[] | select(.Tags[].Value == "pipeline-dev-deploy") | .PublicIpAddress')
echo "URL DATA - $URL"

if [[ "$URL" != "" ]]; then
   http_code=$(curl -s -o /dev/null -w "%{http_code}" http://$URL:80)
   if [[ $http_code -eq 200 ]]; then
      echo "HTTP response code: $http_code"
      echo "Test passed"
      exit 0
   else
      echo "HTTP response code: $http_code"
      echo "Test failed"
      exit 1
   fi
else
    echo "No URL found"
    echo "Test failed"
    exit 1
fi