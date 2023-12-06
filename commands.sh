# Start mysql container
docker run --name mysql -d \
    -e MYSQL_ROOT_PASSWORD=mysqlrootpassword \
    -e MYSQL_DATABASE=omdb \
    -e MYSQL_USER=omdb_user \
    -e MYSQL_PASSWORD=omdb_password \
    -p 3306:3306 \
    mysql