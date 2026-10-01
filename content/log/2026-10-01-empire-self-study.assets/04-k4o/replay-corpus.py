#!/usr/bin/env python3
"""Replay research snapshots, not a claim that exploratory cases are parity gates."""
import argparse
import json
from pathlib import Path
import subprocess
import tempfile


def run(command, input=None):
    p = subprocess.run(command, input=input, capture_output=True, timeout=8)
    return {"exit_code": p.returncode, "stdout": p.stdout.decode(), "stderr": p.stderr.decode()}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--corpus", type=Path, default=Path(__file__).with_name("measured-cases.json"))
    parser.add_argument("--knap", required=True)
    parser.add_argument("--k4o", required=True)
    parser.add_argument("--oliver", required=True)
    args = parser.parse_args()
    assert run([args.knap, "--version"])["stdout"].strip() == "0.6.0"
    assert "a45aa5ede557ea7cf7de727bdba61c1f80af544b" in run([args.oliver, "--version"])["stdout"]
    corpus = json.loads(args.corpus.read_text())
    invocations = 0
    with tempfile.TemporaryDirectory(prefix="k4o-oracle-replay-") as tmp:
        directory = Path(tmp)
        data = directory / "data.json"
        template = directory / "case.knap"
        for case in corpus["cases"]:
            if case.get("verification") == "proposed-not-executed":
                continue
            data.write_text(json.dumps(case["data"], ensure_ascii=False))
            for program, binary in [("knap", args.knap), ("k4o", args.k4o)]:
                template.write_text(case.get("oracle_template", case["template"]) if program == "knap" else case["template"])
                command = [binary, "render", str(template), "--data", str(data)]
                if program == "k4o":
                    command += ["--format", case.get("format", "markdown")]
                actual = run(command)
                snapshot = case.get(program, case["expected_oracle"])
                status = snapshot.get("exit_code", 0 if snapshot.get("status", "ok") == "ok" else 1)
                assert actual["exit_code"] == status, (case["name"], program, actual)
                assert actual["stdout"] == snapshot["stdout"], (case["name"], program, actual)
                assert not actual["stderr"] if status == 0 else bool(actual["stderr"].strip())
                if "commonmark_html" in snapshot:
                    html = run([args.oliver, "render", "--from", "markdown", "--raw-html", "allowed"],
                               input=actual["stdout"].encode())
                    assert html == snapshot["commonmark_html"], (case["name"], program, html)
                invocations += 1
    print(f"PASS {invocations} renderer invocations against recorded snapshots")


if __name__ == "__main__":
    main()
