# Простой тест подключения
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3002" -Method GET -TimeoutSec 5
    Write-Host "Backend доступен на порту 3002!" -ForegroundColor Green
    Write-Host "Статус: $($response.StatusCode)" -ForegroundColor Cyan
} catch {
    Write-Host "Backend НЕ доступен на порту 3002" -ForegroundColor Red
    Write-Host "Ошибка: $($_.Exception.Message)" -ForegroundColor Yellow
}

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3002/api" -Method GET -TimeoutSec 5
    Write-Host "Swagger доступен!" -ForegroundColor Green
} catch {
    Write-Host "Swagger НЕ доступен" -ForegroundColor Red
}
