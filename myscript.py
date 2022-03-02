import os
url = '/media/origine/song.mp3'
filename, file_extension = os.path.splitext(url)
slugname = filename.rsplit('/')[-1]
extname = file_extension
