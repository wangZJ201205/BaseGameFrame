
' the Excel Application
Dim objExcel
' the path to the excel file
Dim excelFileName
Dim ouputPath
' how many worksheets are in the current excel file
Dim worksheetCount
Dim counter
' the worksheet we are currently getting data from
Dim currentWorkSheet
' the value of the current row and column of the current worksheet we are reading
Dim word

If wscript.arguments.Count <2  Then
	wscript.echo "usage: export.vbs excel_file_name output_path"
	wscript.exit(1)
Else
	excelFileName = wscript.arguments(0)
	outputPath = wscript.arguments(1)
	if wscript.arguments.count>2 then
		worksheetCount = wscript.arguments(2)
	else
		worksheetCount = 0
	end if

End If

 
Wscript.Echo "read " & excelFileName

' Create an invisible version of Excel
Set objExcel = CreateObject("Excel.Application")
 
' don't display any messages about documents needing to be converted
' from  old Excel file formats
objExcel.DisplayAlerts = 0
 
' open the excel document as read-only
' open (path, confirmconversions, readonly)
objExcel.Workbooks.open excelFileName, false, true
 
 
' How many worksheets are in this Excel documents

if workSheetCount=0 then
	worksheetCount = objExcel.Worksheets.Count
end if
 
Wscript.Echo "We have " & workSheetCount & " worksheets"
    
'const xlCurrentPlatformText = 6
const xlUnicodeText = 42
 
' Loop through each worksheet
For counter = 1 to workSheetCount
    'Wscript.Echo "-----------------------------------------------" 
    Set currentWorkSheet = objExcel.ActiveWorkbook.Worksheets(counter)
    'Wscript.Echo "Reading data from worksheet " & currentWorkSheet.Name '& vbCRLF
    wscript.echo "save as " & outputPath & currentWorkSheet.Name & ".csv" '& vbCRLF
    currentWorkSheet.saveas outputPath & currentWorkSheet.Name & ".csv", xlUnicodeText
 
    ' We are done with the current worksheet, release the memory
    Set currentWorkSheet = Nothing
Next
 
objExcel.Workbooks(1).Close
objExcel.Quit
 
Set currentWorkSheet = Nothing
' We are done with the Excel object, release it from memory
Set objExcel = Nothing

