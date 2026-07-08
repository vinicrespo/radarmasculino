$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server running at http://localhost:8080"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    $path = $request.Url.LocalPath

    if ($path -eq "/") { $path = "/index.html" }

    $filePath = Join-Path "C:\Users\vcrespo\Desktop\APP" ($path.TrimStart("/"))

    if (Test-Path $filePath) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath)
        $mime = "application/octet-stream"
        if ($ext -eq ".html") { $mime = "text/html; charset=utf-8" }
        elseif ($ext -eq ".css") { $mime = "text/css; charset=utf-8" }
        elseif ($ext -eq ".js") { $mime = "application/javascript; charset=utf-8" }
        $response.ContentType = $mime
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
        $response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $response.Close()
}
