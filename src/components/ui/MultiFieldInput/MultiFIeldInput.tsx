import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../Dialog/Dialog";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import { ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../Table";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";

type MultiFieldInputProps<TValues extends FieldValues> = {
  buttonText: string;
  schema?: ZodTypeAny;
  options?: UseFormProps<TValues>;
  onSubmit: (values: TValues[]) => void;
  title?: string;
  description?: string;
  /** Children can access RHF via function-as-child or useFormContext inside */
  children: (methods: ReturnType<typeof useForm<TValues>>) => React.ReactNode;
  submitText?: string;
  cancelText?: string;
  autoResetOnClose?: boolean;
  values: any[];
  headerTable: { label: string; value: string }[];
  indexBody: string[];
};

const MultiFieldInput = <TValues extends FieldValues>(props: MultiFieldInputProps<TValues>) => {
  const {
    title,
    buttonText,
    children,
    schema,
    options,
    onSubmit,
    description,
    submitText,
    cancelText,
    values,
    headerTable,
    indexBody,
  } = props;

  const [index, setIndex] = useState<number | null>(null);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const methods = useForm<TValues>({
    ...(options || {}),
    resolver: schema ? zodResolver(schema) : options?.resolver,
    shouldUnregister: false,
  });

  useEffect(() => {
    const defaultValues = options?.defaultValues;
    if (defaultValues instanceof Promise) {
      defaultValues.then((values) => methods.reset(values));
    } else {
      methods.reset(options?.defaultValues ?? {} as any);
    }
    if (!openModalForm) methods.reset({} as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalForm])

  useEffect(() => {
    if (!openModalForm) methods.reset({} as any);
  }, [openModalForm])
  
  const handleSubmit = methods.handleSubmit((value) => {
    if (typeof index === 'number') {
      values[index] = value;
      onSubmit(values);
      setIndex(null);
      setOpenModalForm(false);
      return;
    }
    const result = Array.isArray(value) ? value : [value];
    onSubmit([...values, ...result]);
    setOpenModalForm(false);
  });

  const handleEdit = (index: number) => {
    setOpenModalForm(true);
    setIndex(index);
    methods.reset(values[index]);
  }

  const handleDelete = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    methods.reset({} as any);
    onSubmit(newValues);
  }

  const handleView = (index: number) => {
    setOpenModalView(true);
    setIndex(index);
  }

  return (
    <div>
      <header className="flex justify-between items-center mb-4">
        <h4 className="text-[#5b5b5b] text-xl">{title}</h4>
        <Button onClick={() => setOpenModalForm(true)} variant="secondary"><PlusCircle size={16} /> {buttonText}</Button>
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
          <TableBody className="bg-white">
            {((typeof values === 'object' && values.length === 0) || !values) ? (
              <TableRow>
                <TableCell colSpan={headerTable.length+1} className="h-24 text-center">No results.</TableCell>
              </TableRow>
            ) : (
              <>

                {values?.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell key={index}>
                      <div className="flex gap-1 items-center">
                        <Button variant="ghost" onClick={() => handleView(index)}><Eye size={16} /></Button>
                        <Button variant="ghost" onClick={() => handleEdit(index)}><Pencil size={16} /></Button>
                        <Button variant="ghost" onClick={() => handleDelete(index)}><Trash size={16} /></Button>
                      </div>
                    </TableCell>
                    {indexBody?.map((body, index) => (
                      <TableCell key={index} className="max-w-[200px] truncate overflow-hidden">{data[body]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <Dialog open={openModalForm} onOpenChange={setOpenModalForm}>
        <DialogContent showCloseButton className="bg-white min-w-[60vw] max-h-[70vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="mb-6">{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
            <div className="grid gap-4">
              {children(methods)}
              <DialogFooter className="mt-2">
                <Button type="button" variant="secondary" onClick={() => setOpenModalForm(false)}>
                  {cancelText ?? 'Cancel'}
                </Button>
                <Button type="button" variant="default" onClick={handleSubmit}>{submitText ?? 'Submit'}</Button>
              </DialogFooter>
            </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openModalView} onOpenChange={setOpenModalView}>
        <DialogContent showCloseButton className="bg-white min-w-[40vw] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="mb-6">{title}</DialogTitle>
          </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              {
                headerTable.map((header) => (
                  <div key={index} className="">
                    <h3 className="font-semibold text-lg">{header.label}</h3>
                    {typeof index === 'number' && <p>{values[index][header.value]}</p>}
                  </div>
                ))
              }
            </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MultiFieldInput;