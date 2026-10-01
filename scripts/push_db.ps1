# Quick PowerShell runner for applying Supabase database schema
param(
    [string]$Url,
    [string]$File = "supabase/schema.sql"
)

$argsList = @()
if ($Url) {
    $argsList += "--url", $Url
}
if ($File) {
    $argsList += "--file", $File
}

& "backend\.venv\Scripts\python.exe" "scripts/push_db.py" @argsList
