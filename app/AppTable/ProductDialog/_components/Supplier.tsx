// "use client";

// import { Product } from "@/app/Products/columns";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { useProductStore } from "@/app/useProductStore";

// export default function Supplier({
//   selectedSupplier,
//   setSelectedSupplier,
// }: {
//   selectedSupplier: string;
//   setSelectedSupplier: Dispatch<SetStateAction<Product["supplier"]>>;
// }) {
//   const { suppliers } = useProductStore();
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     setSelectedSupplier(suppliers[0]);
//   }, [setSelectedSupplier, suppliers]);

//   if (!isClient) return null;

//   return (
//     <div className="flex flex-col gap-2 poppins">
//       <Label className="text-slate-600">{`Supplier's Name`}</Label>
//       <Select
//         value={selectedSupplier}
//         onValueChange={(value: string) =>
//           setSelectedSupplier(value as Product["supplier"])
//         }
//       >
//         <SelectTrigger className="h-[45px] shadow-none">
//           <SelectValue placeholder="Select a Supplier" />
//         </SelectTrigger>
//         <SelectContent className="poppins">
//           {suppliers.map((supplier) => (
//             <SelectItem key={supplier} value={supplier}>
//               {supplier}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }

import { Dispatch, SetStateAction } from "react";
import { useProductStore } from "@/app/useProductStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SupplierProps {
  selectedSupplier: string;
  setSelectedSupplier: Dispatch<SetStateAction<string>>;
}

export default function Supplier({
  selectedSupplier,
  setSelectedSupplier,
}: SupplierProps) {
  const { suppliers } = useProductStore();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Supplier</label>
      <Select
        value={selectedSupplier}
        onValueChange={(value) => setSelectedSupplier(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a supplier" />
        </SelectTrigger>
        <SelectContent>
          {suppliers.map((supplier) => (
            <SelectItem key={supplier} value={supplier}>
              {supplier}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
