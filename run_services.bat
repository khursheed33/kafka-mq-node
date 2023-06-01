@echo off

REM Start ZooKeeper
start cmd /c "kafka/bin/windows/zookeeper-server-start.bat kafka\config\zookeeper.properties"

REM Wait for a few seconds to allow ZooKeeper to start
ping 127.0.0.1 -n 5 > nul

REM Start Kafka server
start cmd /c "kafka/bin/windows/kafka-server-start.bat kafka\config\server.properties"

REM Wait for a few seconds to allow Kafka server to start
echo Wait for 10 seconds untill services are started properly..
ping 127.0.0.1 -n 10 > nul

REM Run the producer
start cmd /k node lib/producer.js

REM Wait for a few seconds to allow the producer to start
timeout /t 2

REM Run the consumer
start cmd /k node lib/consumer.js

REM Wait for a few seconds to allow the consumer to start
timeout /t 2

REM Run the verified consumer
start cmd /k node lib/verified_consumer.js

REM Keep the command prompt window open
pause
