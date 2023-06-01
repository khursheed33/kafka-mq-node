#!/bin/bash

# Start Kafka services
gnome-terminal --tab --title="Zookeeper" --command="bash -c 'kafka/bin/zookeeper-server-start.sh kafka/config/zookeeper.properties; $SHELL'"
gnome-terminal --tab --title="Kafka Server" --command="bash -c 'kafka/bin/kafka-server-start.sh kafka/config/server.properties; $SHELL'"


# Wait for a few seconds to allow Kafka services to start
sleep 10
echo "Please wait for 10 seconds untill the Kafka services are started properly"
# Run the producer
gnome-terminal --tab --title="Producer" --command="bash -c 'node lib/producer.js; $SHELL'"

# Wait for a few seconds to allow the producer to start
sleep 2

# Run the consumer
gnome-terminal --tab --title="Consumer" --command="bash -c 'node lib/consumer.js; $SHELL'"

# Wait for a few seconds to allow the consumer to start
sleep 2

# Run the verified consumer
gnome-terminal --tab --title="Verified Consumer" --command="bash -c 'node lib/verified_consumer.js; $SHELL'"

# Keep the terminal window open
read -p "Press any key to exit..."
