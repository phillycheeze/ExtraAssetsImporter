import os

# Path to index.html in the same directory
HTML_PATH = os.path.join(os.path.dirname(__file__), 'index.html')
JS_PATH = os.path.join(os.path.dirname(__file__), 'script.js')

def handler(event, context):
    """
    AWS Lambda handler to serve the static HTML page via hello.handler
    """
    # Determine which file to serve based on the request path
    path = event.get('path', '') or event.get('rawPath', '')
    if path.endswith('script.js'):
        file_path = JS_PATH
        content_type = 'application/javascript'
    else:
        file_path = HTML_PATH
        content_type = 'text/html; charset=utf-8'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            body = f.read()
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'text/plain'},
            'body': f'Error loading file: {e}'
        }

    return {
        'statusCode': 200,
        'headers': {'Content-Type': content_type},
        'body': body
    } 