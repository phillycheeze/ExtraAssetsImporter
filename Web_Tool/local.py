#!/usr/bin/env python3
"""
Simple HTTP server to serve this directory on localhost.
Usage:
    python3 local.py [port]
Default port is 8000.
"""
import http.server
import socketserver
import os
import sys

# Default port
port = 8000
if len(sys.argv) > 1:
    try:
        port = int(sys.argv[1])
    except ValueError:
        print(f"Invalid port '{sys.argv[1]}', using default port {port}.")

# Change to script's directory so it serves index.html, script.js, etc.
os.chdir(os.path.dirname(os.path.abspath(__file__)))

handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("localhost", port), handler) as httpd:
    print(f"Serving HTTP at http://localhost:{port}/")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        httpd.server_close()
