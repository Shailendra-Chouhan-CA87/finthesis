import { getUserAccounts } from "@/actions/dashboard";
import AddTransactionForm from "../_components/transaction-form";
import { defaultCategories } from "@/data/categories";
import React from "react";
import { getTransaction } from "@/actions/transaction";

export const dynamic = 'force-dynamic';

// This is the key change - we need to make the page component async
const AddTransactionPage = async ({ searchParams }) => {
  // First await the searchParams if needed (though usually not necessary)
  const params = await Promise.resolve(searchParams);
  const editId = params?.edit;

  // Move all async operations here
  const accounts = await getUserAccounts();
  
  let initialData = null;
  if (editId) {
    initialData = await getTransaction(editId);
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
      <h1 className="text-5xl gradient-title ">{editId?"Edit":"Add"} Transaction</h1>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
};

export default AddTransactionPage;