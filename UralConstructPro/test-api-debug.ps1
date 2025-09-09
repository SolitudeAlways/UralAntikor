# Тест API с подробной диагностикой
Write-Host "=== ДИАГНОСТИКА API ===" -ForegroundColor Yellow

# Тест 1: Проверка доступности backend
Write-Host "`n1. Проверяем доступность backend..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/applications" -Method GET -TimeoutSec 5
    Write-Host "✅ Backend отвечает! Статус: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend не отвечает: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Убедитесь, что backend запущен: npm run start:dev" -ForegroundColor Yellow
    exit
}

# Тест 2: Отправка тестовой заявки
Write-Host "`n2. Отправляем тестовую заявку..." -ForegroundColor Cyan
$testData = @{
    name = "Тест Тестович"
    email = "test@example.com"
    phone = "79991234567"
    productCategory = "building_frames"
    productTitle = "Металлические фермы"
    description = "Тестовое описание задачи для проверки API"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/applications" -Method POST -Body $testData -ContentType "application/json" -Headers @{"X-Recipient-Email"="mihuil.chugunov@mail.ru"}
    Write-Host "✅ Заявка отправлена успешно! Статус: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Ответ: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Ошибка отправки заявки:" -ForegroundColor Red
    Write-Host "Статус: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    Write-Host "Сообщение: $($_.Exception.Message)" -ForegroundColor Red
    
    # Попробуем получить детали ошибки
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Детали ошибки: $responseBody" -ForegroundColor Red
    }
}

Write-Host "`n=== КОНЕЦ ДИАГНОСТИКИ ===" -ForegroundColor Yellow
