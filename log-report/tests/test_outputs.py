import json
import re
from collections import Counter
from pathlib import Path


REPORT_PATH = Path("/app/report.json")
LOG_PATH = Path("/app/access.log")
REQUIRED_KEYS = {"total_requests", "unique_ips", "top_path"}
REQUEST_PATTERN = re.compile(r'"\S+\s+(\S+)\s+HTTP/[^\"]+"')


def _load_report() -> dict:
    return json.loads(REPORT_PATH.read_text(encoding="utf-8"))


def _nonblank_log_lines() -> list[str]:
    return [
        line.strip()
        for line in LOG_PATH.read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]


def test_report_exists():
    """Success criterion 1: /app/report.json exists."""
    assert REPORT_PATH.is_file(), "expected /app/report.json to exist"


def test_report_schema():
    """Success criterion 2: the report is a JSON object with exactly the required keys and value types."""
    report = _load_report()

    assert isinstance(report, dict), "report.json must contain a JSON object"
    assert set(report) == REQUIRED_KEYS, (
        f"expected exactly {sorted(REQUIRED_KEYS)}, got {sorted(report)}"
    )
    assert type(report["total_requests"]) is int, "total_requests must be an integer"
    assert type(report["unique_ips"]) is int, "unique_ips must be an integer"
    assert type(report["top_path"]) is str, "top_path must be a string"


def test_total_requests():
    """Success criterion 3: total_requests equals the number of non-blank access-log lines."""
    report = _load_report()
    expected_total = len(_nonblank_log_lines())

    assert report["total_requests"] == expected_total, (
        f"expected total_requests={expected_total}, got {report['total_requests']!r}"
    )


def test_unique_ips():
    """Success criterion 4: unique_ips equals the number of distinct client IPs."""
    report = _load_report()
    expected_unique_ips = len({line.split()[0] for line in _nonblank_log_lines()})

    assert report["unique_ips"] == expected_unique_ips, (
        f"expected unique_ips={expected_unique_ips}, got {report['unique_ips']!r}"
    )


def test_top_path():
    """Success criterion 5: top_path equals the most frequent request path."""
    report = _load_report()
    path_counts: Counter[str] = Counter()

    for line in _nonblank_log_lines():
        match = REQUEST_PATTERN.search(line)
        path_counts[match.group(1)] += 1

    expected_top_path = path_counts.most_common(1)[0][0]
    assert report["top_path"] == expected_top_path, (
        f"expected top_path={expected_top_path!r}, got {report['top_path']!r}"
    )
