require 'os'
require 'engine'
require 'convert'

-- handle basic info sheet
local of_file = io.open("..\\skill_data.json", "w")
if not of_file then
	print("Failed to open output file: skill_data.json")
else
	of_file:write([[
]])
end

-- 数据
local gdskill = {}

function handle_skill(o)
	local d = {}

	d.id = tonumber(o.a) or 0
	if d.id == 0 then
		return
	end

	d.movement = o.b
	d.attackValue = tonumber(o.c)
	d.src = o.d
	d.delay = tonumber(o.e)
	gdskill[tostring(d.id)] = d
end


export_csv("..\\design\\技能.xlsx")
handle_file("tmp\\技能.csv", handle_skill)
clear_csv()

output_table_json(gdskill, of_file, nil, true, weight_tbl,true)
