import { pdf } from "@react-pdf/renderer";
import { format } from "date-fns";
import { Download, Pencil } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

import { useHeaderNav } from "@/hooks/useHeaderNav.hooks";

import DetailModal from "./components/DetailModal";
import FormModal from "./components/FormModal";
import PDFTemplateDownload from "./components/PDFTemplateDownload";
import { useDeposit } from "./useDeposit";

const Deposit = () => {
  const { changeTitle } = useHeaderNav();
  const {
    headerList,
    values,
    indexBody,
    handleEdit,
    openModal,
    setOpenModal
  } = useDeposit();

  useEffect(() => {
    changeTitle('Deposit');
  }, []);

  const handleDownloadPDF = async () => {
    const blob = await pdf(<PDFTemplateDownload />).toBlob();

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'invoice.pdf';
    link.click();

    setTimeout(() => {
      link.remove();
      URL.revokeObjectURL(url);
    }, 100);
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <Card className="py-2 px-4">
          <h4 className="text-sm">Today Is</h4>
          <p className="text-lg font-semibold">{format(new Date(), 'dd MMM yyyy')}</p>
        </Card>
        <Card className="py-2 px-4">
          <h4 className="text-sm">Opening Balance</h4>
          <p className="text-lg font-semibold">0.00</p>
        </Card>
        <Card className="py-2 px-4">
          <h4 className="text-sm">Current DR</h4>
          <p className="text-lg font-semibold">31,900,000.00</p>
        </Card>
        <Card className="py-2 px-4">
          <h4 className="text-sm">Current CR</h4>
          <p className="text-lg font-semibold">31,900,000.00</p>
        </Card>
        <Card className="py-2 px-4">
          <h4 className="text-sm">Deposit Balance</h4>
          <p className="text-lg font-semibold">0.00</p>
        </Card>
      </div>
      <div className="mb-4">
        <FormModal type="add" openModal={openModal} setOpenModal={setOpenModal} />
      </div>
      <Table className="w-full overflow-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            {headerList.map((header, index) => (
              <TableHead key={index}>{header.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {((values?.length === 0) || !values) ? (
            <TableRow>
              <TableCell colSpan={headerList.length+1} className="h-24 text-center">No results.</TableCell>
            </TableRow>
          ) : (
            <>

              {values?.map((data, index) => (
                <TableRow key={index}>
                  <TableCell key={index}>
                    <div className="flex gap-1 items-center">
                      <DetailModal />
                      <Button className="!p-1" variant="ghost" onClick={() => handleEdit()}><Pencil size={16}/></Button>
                      <Button className="!p-1" variant="ghost" onClick={() => handleDownloadPDF()}><Download size={16}/></Button>
                    </div>
                  </TableCell>
                  {indexBody?.map((body ,index) => (
                    <TableCell key={index}>{data[body as unknown as keyof typeof data]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Deposit;