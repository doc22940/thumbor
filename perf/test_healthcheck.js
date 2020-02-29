import http from 'k6/http';
import { check } from 'k6';

const maxvu = 100;

export let options = {
  stages: [
    { duration: "5s", target: 0 },
    { duration: "5s", target: maxvu },
    { duration: "10s", target: maxvu },
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1000'], // 99% of requests must complete below 1s
  }
};

export default function() {
  let res = http.get('http://localhost:8888/healthcheck');
  check(res, {
    'status was 200': r => r.status === 200,
    'transaction time OK': r => r.timings.duration < 1000,
    'body was WORKING': r => r.body === 'WORKING',
  });
}
