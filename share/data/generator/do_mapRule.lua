require 'os'
require 'engine'
require 'convert'

-- handle basic info sheet
local of_file = io.open("..\\map_rule_data.json", "w")
if not of_file then
	print("Failed to open output file: map_rule_data.json")
else
	of_file:write([[
]])
end

-- 数据
local gdmapRule = {}
function handle_map_rule(o)
	local d = {}

	d.sceneid = tonumber(o.a) or 0
	if d.sceneid == 0 then
		return
	end

	d.time = tonumber(o.b) * 10
	d.group = tonumber(o.c)
	d.monster = tonumber(o.d)
	d.delay = tonumber(o.e)
	d.createCount = tonumber(o.f) -- -1无限 >1 一次以上  控制怪物数量

	if not gdmapRule[d.sceneid..""] then
		gdmapRule[d.sceneid..""] = {}
	end

	table.insert(gdmapRule[d.sceneid..""] , d)

end


export_csv("..\\design\\地图规则.xlsx")
handle_file("tmp\\规则1.csv", handle_map_rule)
handle_file("tmp\\规则2.csv", handle_map_rule)
clear_csv()

output_table_json(gdmapRule, of_file, nil, true, weight_tbl,true)