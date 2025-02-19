// "use client";

// import { Dispatch, SetStateAction } from "react";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { FaCheck } from "react-icons/fa6";
// import { IoClose } from "react-icons/io5";
// import { FaInbox } from "react-icons/fa";
// import { Product } from "@/app/Products/columns";

// export default function Status({
//   selectedTab,
//   setSelectedTab,
// }: {
//   selectedTab: string;
//   setSelectedTab: Dispatch<SetStateAction<Product["status"]>>;
// }) {
//   console.log(selectedTab);

//   return (
//     <div>
//       <Label className="text-slate-600">Status</Label>
//       <Tabs
//         value={selectedTab}
//         onValueChange={(value: string) =>
//           setSelectedTab(value as Product["status"])
//         }
//         className="mt-1"
//       >
//         <TabsList className="h-11 px-2">
//           <TabsTrigger
//             className={`h-8 ${
//               selectedTab === "Published" ? "text-red-500" : ""
//             }`}
//             value="Published"
//           >
//             <FaCheck className="pr-1" />
//             Published
//           </TabsTrigger>
//           <TabsTrigger
//             className={`h-8 ${
//               selectedTab === "Inactive" ? "text-red-500" : ""
//             }`}
//             value="Inactive"
//           >
//             <IoClose />
//             Inactive
//           </TabsTrigger>
//           <TabsTrigger
//             className={`h-8 ${selectedTab === "Draft" ? "text-red-500" : ""}`}
//             value="Draft"
//           >
//             <FaInbox className="pr-1" />
//             Draft
//           </TabsTrigger>
//         </TabsList>
//       </Tabs>
//     </div>
//   );
// }

"use client";

import { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuGitPullRequestDraft } from "react-icons/lu";
import { Product } from "@/app/Products/columns";

const statuses = [
  { value: "Available", label: "Available", icon: <FaCheck /> },
  { value: "Stock Out", label: "Stock Out", icon: <IoClose /> },
  { value: "Stock Low", label: "Stock Low", icon: <LuGitPullRequestDraft /> },
];

export default function Status({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<Product["status"]>>;
}) {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-600";
      case "Stock Out":
        return "bg-red-100 text-red-600";
      case "Stock Low":
        return "bg-orange-100 text-orange-600";
      default:
        return "";
    }
  };

  return (
    <div>
      <Label className="text-slate-600">Status</Label>
      <Tabs
        value={selectedTab}
        onValueChange={(value: string) =>
          setSelectedTab(value as Product["status"])
        }
        className="mt-1"
      >
        <TabsList className="h-11 px-2">
          {statuses.map((status) => (
            <TabsTrigger
              key={status.value}
              className={`h-8 ${getStatusClass(status.value)} ${
                selectedTab === status.value ? "font-bold" : ""
              }`}
              value={status.value}
            >
              {status.icon}
              {status.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
