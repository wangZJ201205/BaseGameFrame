require 'os'
require 'engine'
require 'convert'

-- handle basic info sheet
local of_file = io.open("..\\map_data.json", "w")
if not of_file then
	print("Failed to open output file: map_data.json")
else
	of_file:write([[
]])
end

-- 数据
local gdmap = {}

function handle_map(o)
	local d = {}

	d.id = tonumber(o.a) or 0
	if d.id == 0 then
		return
	end

	d.path = o.b

	--测试
	d.subs = {}
	d.subs.id = 1
	d.subs.path = "123"
	d.subs.boo = true

	table.insert(gdmap, d);
end


export_csv("..\\design\\地图信息.xlsx")
handle_file("tmp\\地图.csv", handle_map)
clear_csv()

output_table_json(gdmap, of_file, nil, nil, weight_tbl)

