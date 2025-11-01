import { useCallback } from "react";
import { Checkbox } from "../Checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../Table/Table"
import { cn } from "@/libs/utils";

type TableInputProps = {
  headerTable: { label: string; value: string }[],
  data: any[];
  onCheck: (value: any) => void;
  title: string;
  values: any[]
} 

const TableInput = (props: TableInputProps) => {
  const { headerTable, data: dataList, onCheck, title, values } = props;
  const indexBody = headerTable.map((header) => header.value);
  const isSelected = useCallback((value: any) => values.some(item => JSON.stringify(item) === JSON.stringify(value)), [values]);

  const handleCheck = (value: any) => {
    if (values.some(item => JSON.stringify(item) === JSON.stringify(value))) {
      const newValues = values.filter(item => JSON.stringify(item) !== JSON.stringify(value));
      return onCheck(newValues);
    }
    
    onCheck([...values, value]);
  };

  return (
    <div>
      <header className="mb-4">
        <h4 className="text-[#5b5b5b] text-xl">{title}</h4>
      </header>
      <div className="border border-gray-100/50 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              {headerTable.map((header, index) => (
                <TableHead key={index}>{header.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(dataList.length === 0) ? (
              <TableRow>
                <TableCell colSpan={headerTable.length} className="h-24 text-center">No results.</TableCell>
              </TableRow>
            ) : (
              <>
                {dataList?.map((data, index) => (
                  <TableRow key={index} className={cn(values !== null && isSelected(data) && 'bg-green-200')}>
                    <TableCell className="font-medium">
                      <Checkbox checked={isSelected(data)} onCheckedChange={() => handleCheck(data)} />
                    </TableCell>
                    {indexBody?.map((body, index) => (
                      <TableCell key={index}>{data[body]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default TableInput