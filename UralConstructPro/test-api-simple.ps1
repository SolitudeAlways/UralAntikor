$headers = @{
    "Content-Type" = "application/json"
    "X-Recipient-Email" = "mihuil.chugunov@mail.ru"
}

$body = '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+7 (999) 123-45-67",
    "productCategory": "building_frames",
    "productTitle": "Steel Trusses",
    "description": "Test application via API"
}'

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3002/api/applications" -Method POST -Headers $headers -Body $body
    Write-Host "SUCCESS: Application sent!" -ForegroundColor Green
    Write-Host "ID: $($response.id)" -ForegroundColor Cyan
    Write-Host "Status: $($response.status)" -ForegroundColor Cyan
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}
