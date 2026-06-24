import subprocess

try:
    res = subprocess.run(["git", "status"], capture_output=True, text=True, cwd="c:\\Users\\user\\3D Objects\\Portfolio")
    print("STATUS OUTPUT:")
    print(res.stdout)
    print(res.stderr)
    
    res2 = subprocess.run(["git", "ls-files", "client/public/logos"], capture_output=True, text=True, cwd="c:\\Users\\user\\3D Objects\\Portfolio")
    print("LS-FILES OUTPUT:")
    print(res2.stdout)
except Exception as e:
    print("Error:", e)
