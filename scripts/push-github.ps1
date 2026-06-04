$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$keyPath = Join-Path $repoRoot ".local-ssh\id_ed25519_batumaccess_auto"

if (-not (Test-Path -LiteralPath $keyPath)) {
  throw "Missing SSH key: $keyPath"
}

git -C $repoRoot remote set-url origin git@github.com:chucklondeo/batumaccess.git
git -C $repoRoot config core.sshCommand "ssh -i .local-ssh/id_ed25519_batumaccess_auto -o IdentitiesOnly=yes"
git -C $repoRoot push origin main
