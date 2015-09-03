import sys, base64

with open('image.png', 'wb') as f:
    f.write(base64.decodestring(sys.argv[1]))
