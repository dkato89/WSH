docker build --rm -t expression88/wsh-test:latest .
docker run --rm -p 5000:80 --name wsh-test expression88/wsh-test
docker tag da2a51a77398 expression88/wsh-test
docker push expression88/wsh-test