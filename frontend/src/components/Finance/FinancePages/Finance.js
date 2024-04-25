import React from "react";
import FinanceMain from "../FinanceMain/FinanceMain";
import FinanceSideBar from "../FinanceSideBar/FinanceSideBar";
import Incomes from "../FinanceMain/Incomes"
import AddExpense from "../FinanceMain/AddExpense";
import UpdateExpense from "../FinanceMain/UpdateExpense";

import AddIncome from "../FinanceMain/AddIncome";
import UpdateIncome from "../FinanceMain/UpdateIncome";
import BillingForm from "../FinanceMain/BillingForm";
import BillsList from "../FinanceMain/BillsList";
import NewInvoice from "../FinanceMain/NewInvoice"
import PaymentInvoiveList from "../FinanceMain/PaymentInvoiceList";
import EmpFinance from "../FinanceMain/EmpFinance";
import ProductSales from "../FinanceMain/ProductSales";
import ServiceOrders from "../FinanceMain/ServiceOrders";
import FinancialReports from "../FinanceMain/FinancialReports";



// Import front end routes
import {

  Route,
  Routes,
  
} from "react-router-dom";
import Expenses from "../FinanceMain/Expenses";

function Finance() {
  return (
    <>
      <FinanceSideBar />

      <Routes>
        <Route path="/" element={<FinanceMain />} />
        
        <Route path="incomes/" element={<Incomes/>} />
        <Route path="incomes/add-income" element={<AddIncome/>}/>
        <Route path="incomes/edit-income/:id" element={<UpdateIncome />} />

        <Route path="expenses/add-expense" element={<AddExpense/>}/>
        <Route path="expenses/" element={<Expenses/>} />
      
        <Route path="expenses/edit-expense/:id" element={<UpdateExpense/>}/>

        <Route path="billing/new" element={<BillingForm/>}/>
        <Route path="billing/all" element={<BillsList/>}/>
        <Route path="invoices/all-invoices" element={<PaymentInvoiveList/>}/>
        <Route path="billing/new-invoice" element={<NewInvoice/>}/>

        <Route path="emp-finance" element={<EmpFinance/>}/>
        <Route path="product-sales" element={<ProductSales/>}/>
      <Route path="service-orders" element={<ServiceOrders/>}/>
      <Route path="financial-reports" element={<FinancialReports/>}/>

      

      </Routes>
    </>
  );
}

export default Finance;
