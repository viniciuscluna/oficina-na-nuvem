import CardClients from "../components/dashboard/cardClients";
import CardOS from "../components/dashboard/cardOS";
import CardProfit from "../components/dashboard/cardProfit";
import RecentlySold from "../components/dashboard/cardRecentlySold";
import CardSoldProducts from "../components/dashboard/cardSoldProducts";
import CategoryChartPie from "../components/dashboard/categoryChartPie";
import MonthProfitChartBar from "../components/dashboard/monthProfitChartBar";
import ProfitChartLine from "../components/dashboard/profitChartLine";
import SubCategoryChartPie from "../components/dashboard/subCategoryChartPie";
import MostUsedBrands from "../components/dashboard/brandsServed";
import TypesOfVehicles from "../components/dashboard/typesOfVehicles";
import BrandsServed from "../components/dashboard/brandsServed";

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
      <div className="flex-nowrap">
        <ProfitChartLine />
      </div>
      <div className="flex-wrap lg:flex-nowrap flex gap-2">
        <RecentlySold />
        <MonthProfitChartBar />
      </div>
      <div className="flex-wrap lg:flex-nowrap flex gap-2">
        <BrandsServed />
        <TypesOfVehicles />
      </div>
      <div className="flex-wrap lg:flex-nowrap flex gap-2">
        <CategoryChartPie />
        <SubCategoryChartPie />
      </div>

    </>
  );
};

export default Dashboard;
