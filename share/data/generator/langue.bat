@lua.exe do_language.lua

@cd ..
@if not exist "database" mkdir "database"
@for %%s in (*.lua) do (
	@if "%%s" == "language_data.lua" (
		copy %%s database\%%s
	)
)
@cd generator

