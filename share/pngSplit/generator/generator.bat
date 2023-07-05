
@cd ..\..\server\src\message\generator
@lua do_enum.lua
@copy /y  ..\..\..\bin\script\definition.lua ..\..\..\..\data\definition.lua

@cd ..\..\..\..\data\generator
@call start.bat
@copy /y ..\eventdefinition.h ..\..\server\src\message\eventdefinition.h

@cd ..
@if not exist "database" mkdir "database"
@for %%s in (*.lua) do (
	@if /i not "%%s" == "definition.lua" (
		@if /i not "%%s" == "maps_block.lua" (
			@if /i not "%%s" == "maps_empty.lua" (
				@if /i not "%%s" == "do_exchangelist.lua" (
					@copy database\%%s ..\client\src\database\%%s
				)
			)
		)
	)
)
@cd generator

