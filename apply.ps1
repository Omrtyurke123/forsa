# شغّله من جذر المشروع (D:\forsa-new):  powershell -ExecutionPolicy Bypass -File .\apply.ps1
Get-ChildItem app -Recurse -Filter *.js | ForEach-Object {
  $t = Get-Content $_.FullName -Raw -Encoding UTF8
  $n = $t -replace 'white/', 'veil/'
  if ($_.Name -in @('Logo.js','JobsFeed.js')) { $n = $n -replace 'text-paper', 'text-[rgb(var(--on-gold))]' }
  if ($n -ne $t) { [IO.File]::WriteAllText($_.FullName, $n, (New-Object Text.UTF8Encoding $false)); "patched $($_.FullName)" }
}
