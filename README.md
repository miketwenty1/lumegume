# lumegume
The purpose of this repo is to be a simple example of a login / password recovery front end with an API. Also includes the use of JWT tokens for auth with different endpoints.
requires: mongo, docker, nodemailer configured (currently gmail for reset password flow).

# mongo docker
docker run --name mongo -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=madmin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  -d mongo:latest

# run without docker
after brew installation
monogod --config /usr/local/etc/mongod.conf

# UI tool for mongodb
- compass

# Nodemailer
- https://myaccount.google.com/u/5/lesssecureapps
- or 2fa + app password
- verify report email as non phishing to get it out of auto-spam

# html Flows
- login
- logout
- signup
- forgot password
- reset password