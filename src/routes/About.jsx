import about from "../assets/about.jpg";

export default function About() {
  return (
    <div className="mt-28  flex items-center py-24 px-10">
      <div className="flex-1">
        <p className="w-3/4">
          This is a fictional store and none of the products displayed here
          exist. Products' information and images: Fake Store API.
        </p>
      </div>
      <div className="flex-1">
        <img src={about} alt="" className="" />
      </div>
    </div>
  );
}
