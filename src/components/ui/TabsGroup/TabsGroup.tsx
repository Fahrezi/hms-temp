import { useCallback } from "react";
import { FieldErrors, FieldValues, UseFormReturn } from "react-hook-form";

import { RHFBridgeProps } from "@/components/pages/Reservation/RegisterForm/types/index.type";

import { Card } from "../Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Tabs/Tabs";

export type TabsListType<T extends FieldValues> = {
  label: string,
  value: string,
  Comp: ({ form, errors, setValue }: RHFBridgeProps<T>) => React.ReactNode;
  errorGroup: Partial<keyof T>[];
};

export type TabsGroupProps<T extends FieldValues> = {
  tabsList: TabsListType<T>[];
  methods: UseFormReturn<T>;
  errors: FieldErrors<T>;
  setValue: UseFormReturn<T>['setValue'];
}

const TabsGroup = <T extends FieldValues>(props: TabsGroupProps<T>) => {
  const { tabsList, methods, errors, setValue } = props;
  const checkError = useCallback((errorGroup: Partial<keyof T>[]) => {
    for (const error of errorGroup) {
      if (error && methods.formState.errors[error]) {
        console.log('true?');
        return true;
      }
    }
    return false;
  }, [errors]);
  
  return (
    <Card className="mt-8">
      <Tabs defaultValue={tabsList[0].value ?? ''}>
        <TabsList className="rounded-lg p-2 gap-2 h-auto mb-4">
          {tabsList.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="relative py-1 px-4 text-normal h-auto font-semibold data-[state=active]:!bg-black data-[state=active]:text-white">
              <span>{tab.label}</span>
              {checkError(tab.errorGroup) && <span className="absolute w-fit aspect-square flex items-center justify-center text-xs rounded-full bg-red-600 px-2 text-white right-0 -top-2">!</span>}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsList.map((tab, index) => (
          <TabsContent value={tab.value} key={index}>
            <tab.Comp form={methods} errors={errors} setValue={setValue} />
          </TabsContent>
        ))}
      </Tabs>   
    </Card>
  )
}

export default TabsGroup;