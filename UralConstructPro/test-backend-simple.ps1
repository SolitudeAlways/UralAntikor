# Тест backend API
Write-Host "Тестируем backend API..."

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/applications" -Method GET
    Write-Host "✅ Backend работает! Статус: $($response.StatusCode)"
    Write-Host "Ответ: $($response.Content)"
} catch {
    Write-Host "❌ Backend не отвечает: $($_.Exception.Message)"
    Write-Host "Попробуйте запустить: cd UralConstructPro/backend && npm start"
}
