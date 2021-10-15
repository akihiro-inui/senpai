FROM ubuntu:20.04

USER root

RUN apt-get update && apt-get install -y wget && apt-get install -y gnupg
RUN wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
RUN apt-get install apt-transport-https
RUN echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-7.x.list
RUN apt-get update && apt-get install logstash && apt-get install cron && apt-get install libpostgresql-jdbc-java

# Copy DB migration files
COPY sync_user.cnf /root/sync_user.cnf

# Copy cron file to the cron.d directory
COPY run_cron /etc/cron.d/run_cron

# Give execution rights on the cron job
RUN chmod -x /etc/cron.d/run_cron

# Apply cron job
RUN crontab /etc/cron.d/run_cron
 
# Create the log file to be able to run tail
RUN touch /var/log/cron.log
 
# Run the command on container startup
CMD cron && tail -f /var/log/cron.log