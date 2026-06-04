param(
  [string]$BaseUrl = "http://127.0.0.1:3010",
  [string]$OutDir = "screenshots"
)

$ErrorActionPreference = "Stop"

$edgeCandidates = @(
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
)

$edge = $edgeCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $edge) {
  throw "Microsoft Edge was not found. Install Edge or update this script with your Chromium browser path."
}

$resolvedOut = Join-Path (Get-Location) $OutDir
New-Item -ItemType Directory -Force -Path $resolvedOut | Out-Null

$profile = Join-Path $resolvedOut "edge-profile"
$pages = @(
  @{ Name = "home"; Url = "$BaseUrl/" },
  @{ Name = "products"; Url = "$BaseUrl/products" }
)

foreach ($page in $pages) {
  $outFile = Join-Path $resolvedOut "$($page.Name).png"
  $args = @(
    "--headless=old",
    "--disable-gpu",
    "--disable-software-rasterizer",
    "--disable-dev-shm-usage",
    "--no-sandbox",
    "--disable-features=VizDisplayCompositor",
    "--hide-scrollbars",
    "--window-size=1440,1200",
    "--virtual-time-budget=3000",
    "--user-data-dir=$profile",
    "--screenshot=$outFile",
    $page.Url
  )

  & $edge @args | Out-Null

  if (-not (Test-Path -LiteralPath $outFile)) {
    throw "Screenshot was not generated: $outFile"
  }

  Write-Host "Generated $outFile"
}

