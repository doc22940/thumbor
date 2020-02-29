#!/bin/bash
k6 run test_image_transform.js
EXITCODE=$?
start-stop-daemon -q --stop --oknodo --remove-pidfile --pidfile /tmp/thumbor-perf.pid > /dev/null 2>&1
exit $EXITCODE
