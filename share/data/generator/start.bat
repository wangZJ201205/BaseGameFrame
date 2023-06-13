
@lua.exe do_map.lua
@lua.exe do_mapRule.lua
@lua.exe do_language.lua
@lua.exe do_entity.lua
@lua.exe do_skill.lua
@lua.exe do_exp.lua
@lua.exe do_item.lua
@lua.exe do_gene.lua
@cd ..
@cd generator

@echo off
xcopy /s /y /f F:\freeGame\BaseGameFrame\share\data\*.json F:\freeGame\BaseGameFrame\Harmony\assets\resources\config\
echo Copy completed.
pause

