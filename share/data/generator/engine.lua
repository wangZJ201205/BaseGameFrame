
require 'string'
require 'table'

function export_csv(file_path, sheet_cnt)
	os.execute("if not exist tmp mkdir tmp")

	local cwd = ""
	os.execute("cd > tmp/_cwd.txt")
	local fcwd = io.open("tmp/_cwd.txt")
	if fcwd then
		cwd = fcwd:read("*l")
		fcwd:close()
	end
	os.remove("tmp/_cwd.txt")

	sheet_cnt = sheet_cnt or 0

	local filename = cwd .. "\\" .. file_path
	local outpath = cwd .. "\\tmp\\"
	--file_path = cwd .. "\\" .. file_path .. " "
	--cwd = cwd .. "\\tmp\\ "

	local fdir = io.open("tmp/dir.txt","w")
	fdir:write(filename)
	fdir:close()

	os.execute("iconv -f UTF-8 -t CP936 tmp/dir.txt > tmp/dir1.txt")

	local fdir1 = io.open("tmp/dir1.txt")
	local str = fdir1:read()
	os.execute("cscript export.vbs " .. str .. " " .. outpath .. " " .. sheet_cnt)
	fdir1:close()

	local cmd = 'dir tmp /b'
	local popen = io.popen(cmd)
	for filename in popen:lines() do
		if (string.sub(filename,-4) == ".csv") then
			os.execute("iconv -f UTF-16LE -t UTF-8 tmp/" .. filename .. " > tmp/" .. filename .. "x")
		end
	end

	--os.execute("cscript export.vbs " .. filename .. " " .. outpath .. " " .. sheet_cnt)
end

function clear_csv()
	os.execute("rmdir /S /Q tmp")
end

--
-- a customized compare function for sorting table that to be ouputed
--
function compare_func(a, b, w_tbl)
	w_tbl = w_tbl or {}
	w_tbl.id = w_tbl.id or -999
	w_tbl.name = w_tbl.name or -998

	local va = a
	local vb = b
	if type(a) ~= "number" then
		va = w_tbl[a] or 0
	end
	if type(b) ~= "number" then
		vb = w_tbl[b] or 0
	end

	if (va == vb) and (type(a) == type(b)) then
		return a<b
	else
		return va<vb
	end
end

--
--	output a table to file in a cutomized format
--	talbe:t
--	file:f
--
function output_table(t, f, tabs, comma, w_tbl)
	if not (type(t)=="table") then
		print("Invalid table to output!")
		return
	end

	tabs = tabs or ""
	local connector = ""
	local k_tbl = {}
	local has_tbl = false
	for k, v in pairs(t) do
		table.insert(k_tbl, k)
		if type(v)=="table" then
			has_tbl = true
		end
	end

	table.sort(k_tbl, function (a,b) return compare_func(a, b, w_tbl) end )

	--
	--	Note that:	getn is only for table with numberic index
	--			not available for table with string index
	--	so we use getn(k_tbl) instead of getn(t), as we know that
	--	k_tbl and t has the same number of k-v pairs
	if table.getn(k_tbl)<12 and not has_tbl then
		connector = ""
		tabs = ""
	else
		connector = "\n"
		tabs = tabs .. "	"
	end

	f:write("{" .. connector)
	for _, k in ipairs(k_tbl) do
		local v = t[k]

		if type(k)=="number" then
			k = "[" .. k .. "]"
		end
		local tv = type(v)
		if tv=="table" then
			f:write(tabs, k, "= ")
			output_table(v, f, tabs .. "	", true)
		elseif tv=="string" then
			if v:sub(1,1)=="\"" and v:sub(-1)=="\"" then
				f:write(tabs, k, "=", v, ","..connector)
			else
				f:write(tabs, k, "=", "\""..v.."\","..connector)
			end
		elseif tv=="boolean" then
			f:write(tabs, k, "=", tostring(v), ","..connector)
		else
			f:write(tabs, k, "=", v or 0, ","..connector)
		end
	end
	if not (tabs=="")then
		tabs = tabs:sub(1,-2)
	end
	if comma then
		f:write(tabs .. "},\n")
	else
		f:write(tabs .. "}\n")
	end
end

function output_table_json(t, f, tabs, comma, w_tbl,isend)
	if not (type(t)=="table") then
		print("Invalid table to output!")
		return
	end

	tabs = tabs or ""
	local connector = ""
	local k_tbl = {}
	local has_tbl = false
	for k, v in pairs(t) do
		table.insert(k_tbl, k)
		if type(v)=="table" then
			has_tbl = true
		end
	end

	table.sort(k_tbl, function (a,b) return compare_func(a, b, w_tbl) end )

	--
	--	Note that:	getn is only for table with numberic index
	--			not available for table with string index
	--	so we use getn(k_tbl) instead of getn(t), as we know that
	--	k_tbl and t has the same number of k-v pairs
	if table.getn(k_tbl)<12 and not has_tbl then
		connector = ""
		tabs = ""
	else
		connector = "\n"
		tabs = tabs .. "	"
	end

	if comma then
		f:write("{" .. connector)
	else
		f:write("[" .. connector)
	end
	for _, k in ipairs(k_tbl) do
		local v = t[k]
		if type(k)=="number" then
			k=""
		else
			k = "\"" .. k .. "\"" ..": "
		end

		local iscoma = _ == #k_tbl
		local lastCon = ""
		if iscoma then
			-- connector = 
			lastCon = connector
		else
			lastCon = "," ..connector
		end
		
		local tv = type(v)
		if tv=="table" then
			local noarray = false
			for tt,_ in pairs(v) do
				if "string"== type(tt) then
					noarray = true
				end
			end

			f:write(tabs, k )
			output_table_json(v, f, tabs .. "", noarray,nil,_==#k_tbl)
		elseif tv=="string" then
			if v:sub(1,1)=="\"" and v:sub(-1)=="\"" then
				f:write(tabs, k,  v, lastCon)
			else
				f:write(tabs, k, "\""..v.."\""..lastCon)
			end
		elseif tv=="boolean" then
			f:write(tabs, k,  tostring(v), lastCon)
		else
			
			f:write(tabs, k,  v or 0, lastCon)
		end
	end
	if not (tabs=="")then
		tabs = tabs:sub(1,-2)
	end
	if comma then
		if isend then
			f:write(tabs .. "}\n")
		else
			f:write(tabs .. "},\n")
		end
	else
		if isend then
			f:write(tabs .. "]\n")
		else
			f:write(tabs .. "],\n")
		end
	end
end

function output_java_table(t, f, comma, tabs, w_tbl)
	if not (type(t)=="table") then
		print("Invalid table to output!")
		return
	end

	tabs = tabs or ""
--	local connector = ""
	local k_tbl = {}
	local has_tbl = false
	for k, v in pairs(t) do
		table.insert(k_tbl, k)
		if type(v)=="table" then
			has_tbl = true
		end
	end

	table.sort(k_tbl, function (a,b) return compare_func(a, b, w_tbl) end )

	--
	--	Note that:	getn is only for table with numberic index
	--			not available for table with string index
	--	so we use getn(k_tbl) instead of getn(t), as we know that
	--	k_tbl and t has the same number of k-v pairs
--	if table.getn(k_tbl)<12 and not has_tbl then
--		connector = ""
--		tabs = ""
--	else
--		connector = "\n"
--		tabs = tabs .. "	"
--	end

--	f:write("{" .. connector)

	local count = 0
	for _, k in ipairs(k_tbl) do
		local v = t[k]

		if type(k)=="number" then
			k = "[" .. k .. "]"
		end
		local tv = type(v)
		if tv=="table" then
--			f:write(tabs, k, "= ")
--			output_table(v, f, tabs .. "	", true)
		else
			if count ~= 0 then
				f:write(", ")
			end

			if tv=="string" then
				if v:sub(1,1)=="\"" and v:sub(-1)=="" then
					f:write(v)
				else
					f:write("\""..v.."\"")
				end
			elseif tv=="boolean" then
				f:write(tostring(v))
			else
				f:write(v or 0)
			end

			count = count + 1
		end
	end
--	if not (tabs=="")then
--		tabs = tabs:sub(1,-2)
--	end
	if comma then
		if comma == 0 then
			f:write(tabs .. ", ")
		elseif comma == 1 then
			f:write(tabs .. "), ")
		elseif comma == 2 then
			f:write(tabs .. "));\n")
		end
	else
		f:write(tabs .. ");\n")
	end
end

local meta_key = {
}

local letterstring = "abcdefghijklmnopqrstuvwxyz"

local idx = 1
for k in letterstring:gfind("%a") do
	meta_key[k] = idx
	meta_key[k:upper()] = idx

	local k2 = 'a'..k
	meta_key[k2] = idx + 26
	meta_key[k2:upper()] = idx + 26

	local k3 = 'b'..k
	meta_key[k3] = idx + 26 * 2
	meta_key[k3:upper()] = idx + 26 * 2

	idx = idx + 1
end


local object_meta = {
    __index = function (tbl, key)
        local nkey = meta_key[key]
		if nkey then
			return tbl[nkey]
		end
    end
}


function handle_line(obj, line, x)
	obj[x] = {}
	setmetatable(obj[x], object_meta)
	local y = 1
	local pos_prev = 1
	local mode = 0
	for pos = 1, line:len() do
		local c = line:sub(pos,pos)
		if mode==1 then
			if c=="\"" then
				mode = 0
			end
		else
			if c=="\"" then
				mode = 1
			elseif c=="	" then
				local val = line:sub(pos_prev, pos-1)
				if val:sub(1,1)=="\"" and val:sub(-1)=="\"" then
					obj[x][y] = val:sub(2,-2)
				elseif val=="" then
					obj[x][y] = 0
				else
					obj[x][y] = val
				end
				y = y+1
				pos_prev = pos+1
			end
		end
	end
	obj[x][y] = line:sub(pos_prev)
	for i=1,#obj[x] do
		obj[x][i] = string.gsub(obj[x][i], "\"\"", "\\\"")
	end
end

function handle_file_ex(fileName, do_func, _start, _step)
	_start = _start or 2
	_step = _step or 1

	local fdir = io.open("tmp/dir2.txt","w")
	fdir:write(fileName)
	fdir:close()

	os.execute("iconv -f UTF-8 -t CP936 tmp/dir2.txt > tmp/dir3.txt")

	local fdir1 = io.open("tmp/dir3.txt")
	local str = fdir1:read()

	fdir1:close()

	fileName = str .. "x"

	local f = io.open(fileName)
	if not f then
		print("Failed to open file:", fileName)
		return
	end

	if not do_func then
		print("Failed to handle file:", fileName, " invalid call back function")
		return
	end
	print("Handling file :" , fileName, _start, _step)

	local cnt = 0
	local obj = {}
	local _end = _start + _step
	local pre_line
	for line in f:lines() do
		if pre_line then
			line = pre_line .. line
		end
		local flag = 0
		for _ in line:gfind("\"") do
			if flag == 0 then
				flag = 1
			else
				flag = 0
			end
		end
		if flag==1 then
			pre_line = line
		else
			pre_line = nil

			cnt = cnt + 1
			if cnt>=_end then
				do_func(obj)
				obj = {}
				_start = _start + _step
				_end = _end + _step

				handle_line(obj, line, cnt-_start+1)
			elseif cnt>=_start then
				handle_line(obj, line, cnt-_start+1)
			end
		end
	end
	if type(obj)=="table" then
		do_func(obj)
		obj = nil
	end
	f:close()
end

function handle_file(fileName, do_func, _start)
	handle_file_ex(fileName, function (o) return do_func(o[1]) end, _start or 2)
end
