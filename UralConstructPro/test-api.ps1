# Тест API для отправки заявки
$headers = @{
    "Content-Type" = "application/json"
    "X-Recipient-Email" = "test@example.com"
}

$body = @{
    name = "Тест API"
    email = "test@example.com"
    phone = "+7 (999) 123-45-67"
    productCategory = "building_frames"
    productTitle = "Металлические фермы"
    description = "Тест через API"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/applications" -Method POST -Headers $headers -Body $body
    Write-Host "✅ Заявка успешно отправлена!" -ForegroundColor Green
    Write-Host "ID заявки: $($response.id)" -ForegroundColor Cyan
    Write-Host "Статус: $($response.status)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Ошибка: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Детали: $responseBody" -ForegroundColor Yellow
    }
}
