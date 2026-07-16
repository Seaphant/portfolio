Analyze the Apache-style access log at `/app/access.log` and write a summary to `/app/report.json`.

Each non-blank line represents one request. The client IP is the first whitespace-separated field. The request path is the value between the HTTP method and protocol version in the quoted request field, such as `/path` in `"GET /path HTTP/1.1"`.

Success criteria:

1. `/app/report.json` exists.
2. `/app/report.json` contains a valid JSON object with exactly these keys and value types: `total_requests` as an integer, `unique_ips` as an integer, and `top_path` as a string. No additional keys are allowed.
3. `total_requests` equals the number of non-blank lines in `/app/access.log`.
4. `unique_ips` equals the number of distinct client IPs in `/app/access.log`.
5. `top_path` equals the request path that occurs most often in `/app/access.log`.
