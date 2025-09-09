$headers = @{
    "Content-Type" = "application/json"
    "X-Recipient-Email" = "Mihuil.chugunov@gmail.com"
}

$body = '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+7 (999) 123-45-67",
    "productCategory": "building_frames",
    "productTitle": "Steel Trusses",
    "description": "Test application via API"
}'

# Тестируем разные пути
$urls = @(
    "http://localhost:3002/api/applications",
    "http://localhost:3002/applications",
    "http://localhost:3002/api/v1/applications"
)

foreach ($url in $urls) {
    Write-Host "Тестируем: $url" -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri $url -Method POST -Headers $headers -Body $body
        Write-Host "SUCCESS: Application sent to $url!" -ForegroundColor Green
        Write-Host "ID: $($response.id)" -ForegroundColor Cyan
        Write-Host "Status: $($response.status)" -ForegroundColor Cyan
        break
    } catch {
        Write-Host "ERROR for $url : $($_.Exception.Message)" -ForegroundColor Red
    }
}
