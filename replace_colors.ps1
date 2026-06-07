$colorMap = @{
    "#2ecea0" = "#7AB5E9"
    "#26b38a" = "#5CA5E4"
    "#6dddbd" = "#BEDBF4"
    "#244d54" = "#1F75C1"
    "46 206 160" = "122 181 233"
    "109 221 189" = "190 219 244"
    "36 77 84" = "31 117 193"
}

Get-ChildItem -Path "D:\abc\Click-Health-fe-web\src" -Recurse -Include *.js,*.jsx,*.ts,*.tsx,*.css | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw
    if ($null -ne $content) {
        $original = $content
        foreach ($key in $colorMap.Keys) {
            $content = [regex]::Replace($content, "(?i)$key", $colorMap[$key])
        }
        if ($content -cne $original) {
            Set-Content -Path $file -Value $content -Encoding UTF8
        }
    }
}
Write-Host "Color replacement done!"
