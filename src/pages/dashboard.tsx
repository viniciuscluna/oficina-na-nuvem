import CardClients from "../components/dashboard/cardClients";
import CardOS from "../components/dashboard/cardOS";
import CardProfit from "../components/dashboard/cardProfit";
import CardSoldProducts from "../components/dashboard/cardSoldProducts";
import CategoryChartPie from "../components/dashboard/categoryChartPie";
import ProfitChartBar from "../components/dashboard/profitChartBar";
import SubCategoryChartPie from "../components/dashboard/subCategoryChartPie";

const Dashboard = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold dark:text-white my-6">
          Dashboard
        </h2>
      </div>
      <div className="flex-wrap lg:flex-nowrap flex gap-2 mb-5">
        <CardProfit />
        <CardOS />
        <CardClients />
        <CardSoldProducts />
      </div>
      <div className="flex-wrap lg:flex-nowrap flex gap-2">
        <CategoryChartPie />
        <SubCategoryChartPie />
      </div>
      <div className="flex-nowrap">
        <ProfitChartBar />
      </div>
    </>
  );
};

export default Dashboard;
