require 'os'
require 'engine'
require 'convert'

-- handle basic info sheet
local of_file = io.open("..\\item_data.json", "w")
if not of_file then
	print("Failed to open output file: item_data.json")
else
	of_file:write([[
]])
end

-- 数据
local gditem = {}

local item_type_name = {
	["经验"] = 1,
}

function handle_item(o)
	local d = {}

	d.id = tonumber(o.a) or 0
	if d.id == 0 then
		return
	end

	d.name = o.b
	d.src = o.c
	d.datax = tonumber(o.d)
	d.datay = tonumber(o.e)
	d.dataz = tonumber(o.f)
	d.datau = tonumber(o.g)
	d.type  = item_type_name[o.h]
	gditem[tostring(d.id)] = d
end


export_csv("..\\design\\物品表.xlsx")
handle_file("tmp\\物品.csv", handle_item)
clear_csv()

output_table_json(gditem, of_file, nil, true, weight_tbl,true)

