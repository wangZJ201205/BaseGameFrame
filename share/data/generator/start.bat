
@lua.exe do_map.lua
@cd ..
@if not exist "database" mkdir "database"
@for %%s in (*.lua) do (
	@if not "%%s" == "definition.lua" (
		@if /i not "%%s" == "maps_block.lua" (
			@if /i not "%%s" == "maps_empty.lua" (
				@if /i not "%%s" == "trans_data.lua" (
					copy %%s database\%%s
				)
			)
		)
	)
)
@cd generator

