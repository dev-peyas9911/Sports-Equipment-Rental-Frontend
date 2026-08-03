import { redirect } from "next/navigation";

const AddGearRedirectPage = () => {
  redirect("/provider-dashboard/gear/new");
};

export default AddGearRedirectPage;
