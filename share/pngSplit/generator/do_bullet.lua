require 'os'
require 'engine'
require 'convert'

function find_lua_files(directory)
    local files = {}
    local handle = io.popen('dir "' .. directory .. '" /b /s')
    local result = handle:read("*a")
    handle:close()

    for file in result:gmatch("[^\r\n]+") do
        if file:match("%.lua$") then
            table.insert(files, file)
        end
    end

    return files
end

local directory = "F:/freeGame/hjswj_2_iphonehd"
local lua_files = find_lua_files(directory)

for i, file in ipairs(lua_files) do
    
    local filename = file:match("[^/\\]+$")
    local newFilename = string.gsub(filename, "%.lua$", "")
	
    print(file,filename,newFilename)
    data = dofile(file)

    local of_file = io.open("..\\output2\\"..newFilename..".py", "w")
    output_table_json(data, of_file, nil, true, weight_tbl,true,"bullet")
end



