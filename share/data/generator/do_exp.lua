require 'os'
require 'engine'
require 'convert'

-- handle basic info sheet
local of_file = io.open("..\\exp_data.json", "w")
if not of_file then
	print("Failed to open output file: exp_data.json")
else
	of_file:write([[
]])
end

-- 数据
local gdexp = {}

function handle_exp(o)
	local d = {}

	d.lv = tonumber(o.a) or 0
	if d.lv == 0 then
		return
	end

	d.exp = tonumber(o.b)
	d.time = tonumber(o.c)
	gdexp[tostring(d.lv)] = d
end


export_csv("..\\design\\升级.xlsx")
handle_file("tmp\\经验.csv", handle_exp)
clear_csv()

output_table_json(gdexp, of_file, nil, true, weight_tbl,true)

