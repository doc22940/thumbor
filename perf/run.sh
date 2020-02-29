#!/bin/bash
# { poetry run uvicorn --log-level critical --host "0.0.0.0" "static_app:APP"; } &
{ thumbor -l error -c thumbor.conf; } &
{ k6 run test_image_transform.js; } &
wait -n
EXIT=$?
kill 0;exit $EXIT
