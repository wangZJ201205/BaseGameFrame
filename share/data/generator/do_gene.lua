require 'os'
require 'engine'
require 'convert'

-- handle basic info sheet
local of_file = io.open("..\\gene_data.json", "w")
if not of_file then
	print("Failed to open output file: gene_data.json")
else
	of_file:write([[
]])
end

-- 数据
local gdgene = {}

function handle_gene(o)
	local d = {}

	d.id = tonumber(o.a) or 0
	if d.id == 0 then
		return
	end

	d.type = tonumber(o.b)
	d.name = o.c
	d.time = tonumber(o.d)
	d.datax = tonumber(o.e)
	d.datay = tonumber(o.f)
	d.dataz = tonumber(o.g)
	d.datau = tonumber(o.h)
	d.desc = o.i
	gdgene[tostring(d.id)] = d
end


export_csv("..\\design\\基因.xlsx")
handle_file("tmp\\基因类型.csv", handle_gene)
clear_csv()

output_table_json(gdgene, of_file, nil, true, weight_tbl,true)

