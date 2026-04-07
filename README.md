# Gigadoc Extension (Gigacode/Gemini + Qwen)

Расширение для документирования Python-файлов и директорий проекта в официальном русскоязычном стиле.

## Публичные ссылки

1. Extension repo: [https://github.com/travinov/gigadoc-extension](https://github.com/travinov/gigadoc-extension)
2. MCP repo: [https://github.com/travinov/gigadoc-mcp](https://github.com/travinov/gigadoc-mcp)
3. MCP npm: [https://www.npmjs.com/package/gigadoc-mcp](https://www.npmjs.com/package/gigadoc-mcp)

## Форматы манифеста

Репозиторий содержит несколько manifest-файлов:

1. `gigacode-extension.json` — основной для Gigacode fork.
2. `gemini-extension.json` — Gemini-совместимый формат.
3. `qwen-extension.json` — формат Qwen.

## Важно про MCP

Для Gigacode/Gemini расширение обычно ставится отдельно от MCP-конфига.  
Команды `/doc:sber` и `/sber` требуют доступности MCP tools:

1. `analyze_python_target`
2. `build_sber_doc_outline`
3. `build_sber_project_outline`
4. `validate_sber_doc`

Если tools не подключены, команда корректно сообщит о необходимости добавить MCP server `gigadoc-mcp`.

## Установка в Gigacode

В интерфейсе:

```text
/extensions install https://github.com/travinov/gigadoc-extension.git
```

Локальная разработка:

```bash
git clone https://github.com/travinov/gigadoc-extension.git
gigacode extensions link /absolute/path/to/gigadoc-extension
```

## Подключение MCP server в Gigacode

Рекомендуемый вариант через `npx`:

```json
{
  "mcpServers": {
    "gigadoc-mcp": {
      "command": "npx",
      "args": ["--yes", "gigadoc-mcp"],
      "timeout": 15000
    }
  }
}
```

Локальный build-вариант:

```json
{
  "mcpServers": {
    "gigadoc-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/gigadoc-mcp/dist/src/index.js"],
      "timeout": 15000
    }
  }
}
```

## Использование

1. Один файл:

```text
/doc:sber /repo/src/module.py
# или
/sber /repo/src/module.py
```

2. Вся директория:

```text
/doc:sber /repo/src
```

Результат: структурированный документ (модульный или проектный), затем проверка качества через `validate_sber_doc`.
