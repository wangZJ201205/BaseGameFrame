require 'os'
require 'engine'
require 'convert'

-- handle basic info sheet
local of_file = io.open("..\\language_data.json", "w")
if not of_file then
	print("Failed to open output file: language_data.json")
else
	of_file:write([[
]])
end

-- 数据
local gdlanguage = {}

function handle_language(o)
	local d = {}

	d.id = tonumber(o.a) or 0
	if d.id == 0 then
		return
	end

	d.text = o.b
	gdlanguage[tostring(d.id)] = d.text
	-- table.insert(gdlanguage, d);
end


export_csv("..\\design\\错误码.xlsx")
handle_file("tmp\\错误码.csv", handle_language)
clear_csv()

output_table_json(gdlanguage, of_file, nil, true, weight_tbl,true)

